import { createContext, useEffect, useState } from 'react';
import { databases, client } from '../lib/appwrite';
import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { useUser } from '../hooks/useUser';

const DATABASE_ID= process.env.DATABASE_ID || '68657f2e001107851422';
const CARDS_COLLECTION_ID = process.env.CARDS_COLLECTION_ID || '686748f2002003b4c8d9';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);
  const { user } = useUser();

  async function fetchCardsByStack(stackId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CARDS_COLLECTION_ID,
        [
          Query.equal('stackId', stackId),
          Query.equal('userId', user.$id)
        ]
      );
      setCards(response.documents);
      console.log('Fetched cards:', response.documents);
      return response.documents;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchCardById(cardId) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        CARDS_COLLECTION_ID,
        cardId
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createCard({ cardFront, cardBack, stackId }) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        CARDS_COLLECTION_ID,
        ID.unique(),
        {
          cardFront,
          cardBack,
          stackId,
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteCard(cardId, stackId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        CARDS_COLLECTION_ID,
        cardId
      )

      await fetchCardsByStack(stackId)

    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateCard(cardId, data) {
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      CARDS_COLLECTION_ID,
      cardId,
      data
    );
    return updated;

  } catch (error) {
    console.log(error.message);
  }
}





  useEffect(() => {
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${CARDS_COLLECTION_ID}.documents`;

    if (user) {
      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes('create')) {
          setCards((prev) => [...prev, payload]);
        }

        if (events[0].includes('update')) {
          setCards((prev) => prev.map((card) =>
          card.$id === payload.$id ? payload : card));
        }

        if (events[0].includes('delete')) {
          setCards((prev) =>
            prev.filter((card) => card.$id !== payload.$id)
          );
        }

      });
    } else {
      setCards([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <CardsContext.Provider
      value={{
        cards,
        fetchCardsByStack,
        fetchCardById,
        createCard,
        deleteCard,
        updateCard,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}