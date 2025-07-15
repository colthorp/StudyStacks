import { createContext, useEffect, useState } from 'react';
import { databases, client } from '../lib/appwrite';
import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { useUser } from '../hooks/useUser';

const DATABASE_ID= process.env.DATABASE_ID || '68657f2e001107851422';
const COLLECTION_ID = process.env.COLLECTION_ID || '68657f420003264efb87';

export const StacksContext = createContext();

export function StacksProvider({ children }) {
    const [stacks, setStacks] = useState([])
    const { user } = useUser()

    async function fetchStacks() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('userId', user.$id)
                ]
            )
            setStacks(response.documents)
            console.log(response.documents)

        } catch (error) {
            console.log(error.message)
        }
    }

    async function fetchStackById(id) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
            return response

        } catch (error) {
            console.log(error.message)
        }
    }

    async function createStack(data) {
        try {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...data, userId: user.$id},
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            )

        } catch (error) {
            console.log(error.message)
        }
    }

    async function deleteStack(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let unsubscribe
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`



        if (user) {
            fetchStacks()

            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response

                if (events[0].includes('create')) {
                    setStacks((prevStacks) => [...prevStacks, payload])
                }

                if (events[0].includes('delete')) {
                    setStacks((prevStacks) => prevStacks.filter((stack) => stack.$id !== payload.$id))
                }

            })
        } else {
            setStacks([])
        }

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [user])


    return(
        <StacksContext.Provider
            value={{ stacks, fetchStacks, fetchStackById, createStack, deleteStack}}>
            {children}


        </StacksContext.Provider>
    )

}