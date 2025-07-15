import { StyleSheet, FlatList, Pressable } from 'react-native';
import { useStacks } from '../../hooks/useStacks';
import { Colors } from '../../constants/colors';
import { useRouter } from 'expo-router';

import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import ThemedCard from '../../components/ThemedCard';

const Stacks = () => {
    const { stacks } = useStacks()
    const router = useRouter()

        return (
        <ThemedView style={styles.container} safe={true}>

            <Spacer />
            <ThemedText title={true} style={styles.heading}>
                Study Stacks
            </ThemedText>

            <Spacer />
            <FlatList
                data={stacks}
                keyExtractor={(item) => item.$id}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                    <Pressable onPress={() => router.push(`/stacks/${item.$id}`)}>
                        <ThemedCard style={styles.card}>
                            <ThemedText style={styles.title}>{item.title}</ThemedText>
                            <ThemedText style={styles.description}>{item.description}</ThemedText>
                        </ThemedCard>
                    </Pressable>
                )}
                />

        </ThemedView>

    )
}

export default Stacks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
})