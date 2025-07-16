import { useLocalSearchParams } from 'expo-router';
import { useCards } from '../../../../hooks/useCards';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { Colors } from '../../../../constants/colors';


//Themed Componenets
import ThemedView from '../../../../components/ThemedView';
import ThemedText from '../../../../components/ThemedText';
import Spacer from '../../../../components/Spacer';
import ThemedFlipCard from '../../../../components/ThemedFlipCard';



const screenWidth = Dimensions.get('window').width;

export default function PlayStack() {
  const { id } = useLocalSearchParams();
  const { cards, fetchCardsByStack } = useCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const colorScheme = useColorScheme()
  const cardText = colorScheme === 'dark' ? Colors.light.text : Colors.dark.text;

  useEffect(() => {
    fetchCardsByStack(id);
  }, [id]);

  const stackCards = cards.filter((card) => card.stackId === id);

  if (stackCards.length === 0) {
    return (
      <ThemedView safe style={styles.container}>
        <ThemedText>No cards in this stack.</ThemedText>
      </ThemedView>
    );
  }

  const currentCard = stackCards[currentIndex];

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  const handleNext = () => {
    setShowBack(false);
    if (currentIndex < stackCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const handlePrev = () => {
    setShowBack(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(stackCards.length - 1);
    }
  };

  return (
    <ThemedView safe style={styles.container}>
      <TouchableOpacity onPress={handleFlip} style={styles.card}>
        <ThemedFlipCard style={styles.card}>
          <ThemedText style={[styles.cardText, {color: cardText}]}>
            {showBack ? currentCard.cardBack : currentCard.cardFront}
          </ThemedText>
        </ThemedFlipCard>
      </TouchableOpacity>

        <Spacer height={20} />

        <ThemedText>
          Card {currentIndex + 1} of {stackCards.length}
        </ThemedText>

        <Spacer height={20} />

      <ThemedView style={styles.navContainer}>
          <ThemedText
            style={styles.nav}
            onPress={handlePrev}>
            ◀ Previous
          </ThemedText>

          <Spacer height={10} />
          <ThemedText
            style={styles.nav}
            onPress={handleNext}>
            Next ▶
          </ThemedText>
          
      </ThemedView>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: screenWidth * 0.8,
    height: 250,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  nav: {
    fontSize: 18,
    marginHorizontal: 10
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    marginTop: 20,
  }
});
