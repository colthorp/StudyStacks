import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { databases } from '../../../../../../lib/appwrite';
import { StyleSheet, TextInput, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useCards } from '../../../../../../hooks/useCards';
import { Colors } from '../../../../../../constants/colors';

//Themed Components
import ThemedView from '../../../../../../components/ThemedView';
import ThemedTextInput from '../../../../../../components/ThemedTextInput';
import ThemedText from '../../../../../../components/ThemedText';
import ThemedButton from '../../../../../../components/ThemedButton';
import Spacer from '../../../../../../components/Spacer';




export default function EditCard() {
  const { id: stackId, cardId } = useLocalSearchParams();
  const { fetchCardById, updateCard, deleteCard } = useCards();
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const router = useRouter();
  
  const DATABASE_ID = process.env.DATABASE_ID || '68657f2e001107851422';
  const CARDS_COLLECTION_ID = process.env.CARDS_COLLECTION_ID || '686748f2002003b4c8d9';


  useEffect(() => {
    const loadCard = async () => {
      const card = await fetchCardById(cardId);
      setCardFront(card.cardFront);
      setCardBack(card.cardBack);
    };
    loadCard();
  }, [cardId]);

  const handleSave = async () => {
    if (!cardFront.trim() || !cardBack.trim()) {
    alert('Please fill in both sides of the card.');
    return;
  }

  try {
    const updateCard = await databases.updateDocument(
      DATABASE_ID,
      CARDS_COLLECTION_ID,
      cardId,
      {
        cardFront,
        cardBack,
      }
    );
    console.log('Updated card:', updateCard);
  } catch (error) {
    console.log('Update Error:', error.message)
  }
    router.replace(`/stacks/${stackId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteCard(cardId, stackId);
      router.replace(`/stacks/${stackId}`);
    } catch (error) {
      console.log('Delete Error:', error.message)
    }
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
          placeholder="Card Back"
          value={cardBack}
          onChangeText={setCardBack}
          multiline= {true}
          
        />
        <Spacer />

        <ThemedView style={styles.buttonRow}>
          <ThemedButton onPress={handleSave}>
            <Text style={{ color: '#f2f2f2'}}>Update Card</Text>
          </ThemedButton>
          <ThemedButton style={styles.deleteButton} onPress={handleDelete}>
            <Text style={{ color: '#f2f2f2'}}>Delete Card</Text>
          </ThemedButton>
        </ThemedView>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
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
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 10,
    },
    deleteButton: {
      backgroundColor: Colors.delete
    }
});
