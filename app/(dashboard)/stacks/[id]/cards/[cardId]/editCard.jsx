import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useCards } from '../../../../../../hooks/useCards';

//Themed Components
import ThemedView from '../../../../../../components/ThemedView';
import ThemedTextInput from '../../../../../../components/ThemedTextInput';
import ThemedText from '../../../../../../components/ThemedText';
import ThemedButton from '../../../../../../components/ThemedButton';
import Spacer from '../../../../../../components/Spacer';

export default function EditCard() {
  const { id: stackId, cardId } = useLocalSearchParams();
  const { fetchCardById, createCard, deleteCard } = useCards();
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const router = useRouter();


  useEffect(() => {
    const loadCard = async () => {
      const card = await fetchCardById(cardId);
      setCardFront(card.cardFront);
      setCardBack(card.cardBack);
    };
    loadCard();
  }, [cardId]);

  const handleSave = async () => {
    await deleteCard(cardId); // remove old one
    await createCard({ cardFront, cardBack, stackId }); // recreate
    router.replace(`/stacks/${stackId}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
          Edit Card
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          value={cardFront}
          onChangeText={setCardFront}
          placeholder="Card Front"
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          value={cardBack}
          onChangeText={setCardBack}
          placeholder="Card Back"
        />
        <Spacer />

        <ThemedButton onPress={handleSave}>
          <Text style={{ color: 'fff'}}>Update Card</Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    heading: {
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center"
    },
    input: {
      padding: 20,
      borderRadius: 6,
      alignSelf: 'stretch',
      marginHorizontal: 40
    },
    multiline: {
      padding: 20,
      borderRadius: 6,
      minHeight: 100,
      alignSelf: 'stretch',
      marginHorizontal: 40
    }
});
