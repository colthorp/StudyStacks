import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useStacks } from '../../hooks/useStacks';
import { useRouter } from 'expo-router';
import { useState } from 'react';

//Themed Components
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';


const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const { createStack } = useStacks();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            alert('Please fill in all fields');
            return;
        }
        setLoading(true)

        await createStack({title, description})
        setTitle('')
        setDescription('')

        router.replace('/stacks')
        setLoading(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>

                <ThemedText title={true} style={styles.heading}>
                    Add New Stack
                </ThemedText>
                <Spacer />

                <ThemedTextInput
                    style={styles.input}
                    placeholder='Stack Title'
                    value={title}
                    onChangeText={setTitle}
                />
                <Spacer />

                <ThemedTextInput
                style={styles.multiline}
                placeholder='Stack Description'
                value={description}
                onChangeText={setDescription}
                multiline={true}
                />
                <Spacer />

                <ThemedButton onPress={handleSubmit} disabled={loading}>
                    <Text style={{ color: 'fff' }}>
                        {loading ? 'Saving...' :'Create Stack'}
                    </Text>
                </ThemedButton>

            </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default Create

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
})