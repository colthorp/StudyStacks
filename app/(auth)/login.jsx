import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/colors'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'

//Themed Components
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  const { login } = useUser()

    const handleSubmit = async () => {
      setError(null)

     try {
      await login(email, password)
     } catch (error) {
      setError(error.message)
     }
    }
        
    return (
      //<TouchableWithoutFeedback>
        <ThemedView style={styles.container}>

            <Spacer />
            <ThemedText title={true} style={styles.title}>
              Login to Your Account
            </ThemedText>

            <ThemedTextInput
              style={{ width: '80%', marginBottom: 20 }} 
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
          />

          <ThemedTextInput
              style={{ width: '80%', marginBottom: 20 }} 
              placeholder='Password'
              secureTextEntry
              onChangeText={setPassword}
              value={password}
          />

          <ThemedButton onPress={handleSubmit}>
              <Text style={{ color: '#f2f2f2' }}>Login</Text>
          </ThemedButton>

          <Spacer />
          {error && <Text style={styles.error}>{error}</Text>}

          <Spacer height={100} />
          <Link href ='/register'>
              <ThemedText style={{ textAlign: 'center'}}>
              Create an Account
              </ThemedText>
          </Link>

        </ThemedView>
    //</TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})
