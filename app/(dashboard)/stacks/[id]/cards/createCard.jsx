import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useCards } from '../../../../../hooks/useCards';


import ThemedView from '../../../../../components/ThemedView';
import ThemedButton from '../../../../../components/ThemedButton';
import Spacer from '../../../../../components/Spacer';
import ThemedText from '../../../../../components/ThemedText';
import ThemedTextInput from '../../../../../components/ThemedTextInput';


export default function CreateCard() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { createCard } = useCards();

  const [loading, setLoading] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');


  const handleCreateCard = async () => {
    if(!cardFront.trim() || !cardBack.trim()) {
      alert('Please fill in both sides of the card')
      return;
    }
    await createCard({
      cardFront,
      cardBack,
      stackId: id
    });
    setCardFront('');
    setCardBack('');
    router.replace(`/stacks/${id}`);
  };

  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
          Create New Card
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Card Front"
          value={cardFront}
          onChangeText={setCardFront}
        />

        <Spacer/>

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Card Back"
          value={cardBack}
          onChangeText={setCardBack}
          multiline={true}
        />

        <Spacer/>

        <ThemedButton onPress={handleCreateCard} disabled={loading}>
          <Text style={{ color: '#f2f2f2' }}>
            {loading ? 'Saving...' : 'Add Card'}
          </Text>
        </ThemedButton>

      </ThemedView>
    //</TouchableWithoutFeedback>
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
