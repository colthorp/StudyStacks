import { StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useStacks } from '../../../../hooks/useStacks';
import { useCards } from '../../../../hooks/useCards';
import { Colors } from '../../../../constants/colors'

// Themed Components
import ThemedText from '../../../../components/ThemedText';
import ThemedButton from '../../../../components/ThemedButton';
import Spacer from '../../../../components/Spacer';
import ThemedView from '../../../../components/ThemedView';
import ThemedCard from '../../../../components/ThemedCard';
import ThemedLoader from '../../../../components/ThemedLoader';


const StackDetails = () => {
  const [stack, setStack] = useState(null);
  const { id } = useLocalSearchParams();
  const { fetchStackById, deleteStack } = useStacks();
  const { fetchCardsByStack, cards } = useCards();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteStack(id);
    router.replace('/stacks');
  };



  useEffect(() => {
    if (id) {
      fetchStackById(id).then((data) => setStack(data));
      fetchCardsByStack(id);
    }
  }, [id]);

  const stackCards = cards.filter((card) => card.stackId === id);

  if (!stack) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
      <ThemedView safe={true} style={styles.container}>
        <Spacer />
          <ThemedText style={styles.mainHeading}>{stack.title}</ThemedText>
          <Spacer height={10} />

        <ThemedText style={styles.heading} title={true}>Cards in this stack:</ThemedText>

          <FlatList
              data={stackCards}
              keyExtractor={(item) => item.$id}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/stacks/${id}/cards/${item.$id}/editCard`)}>
              <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>{item.cardFront}</ThemedText>
                <ThemedText>{item.cardBack}</ThemedText>
              </ThemedCard>
            </Pressable>
          )}
        /> 

        <Spacer height={10} />

        <ThemedView style={styles.button}>
          <ThemedView style={styles.buttonRow}>

            <ThemedButton style={styles.button}
              onPress={() => router.push(`/stacks/${id}/play`)}>
              <Text style={{ color: '#f2f2f2'}}>Study Stack</Text>
            </ThemedButton>

            <ThemedButton
              onPress={() => router.push(`/stacks/${id}/cards/createCard`)}>
              <Text style={{ color: '#f2f2f2'}}>Add New Card</Text>
            </ThemedButton>

            <ThemedButton style={styles.deleteButton} onPress={handleDelete}>
              <Text style={{ color: '#f2f2f2'}}>Delete Stack</Text>
            </ThemedButton>
          </ThemedView>

        </ThemedView>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
    mainHeading: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
    },
    list: {
        marginTop: 40
    },
    card: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10,
        padding: 10,
        paddingLeft: 14,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 8
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    deleteButton: {
      backgroundColor: Colors.delete  
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 10,
    }
})

export default StackDetails;