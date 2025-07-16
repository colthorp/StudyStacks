import { StyleSheet, Text, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native'

import { Link } from 'expo-router'
import { useState } from 'react'
import { Colors } from '../../constants/colors'
import { useUser } from '../../hooks/useUser'

//Themed Components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
 
    const { signup } = useUser()

    const handleSubmit = async () => {
        setError(null)

        try {
            await signup(email, password)
        } catch (error) {
            setError(error.message)
        }
    }
    
  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>

            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Create an Account
            </ThemedText>

            <ThemedTextInput
                style={{ width: '80%', marginBottom: 20}}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
            />

            <ThemedTextInput
                style={{ width: '80%', marginBottom: 20}}
                placeholder='Password'
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <ThemedButton onPress={handleSubmit}>
                <Text style={{ color: '#f2f2f2' }}>Sign Up</Text>
            </ThemedButton>

            <Spacer />
                {error && <Text style={styles.error}>{error}</Text>}

            <Spacer height={100} />
            <Link href ='/login'>
                <ThemedText style={{ textAlign: 'center'}}>
                Already have an account? Login instead
                </ThemedText>
            </Link>

        </ThemedView>
    //</TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30
    },
    error:{ 
        color: Colors.warning,
        padding: 10,
        backgroundColor: '#f5c1c8',
        borderColor: Colors.warning,
        borderWidth: 1,
        borderRadius: 6,
        marrginHorizontal: 10,
    }
})