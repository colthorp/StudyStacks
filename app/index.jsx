import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'

//Themed Components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'

const Home = () => {
  return (
    <ThemedView style={styles.container}>
        <ThemedLogo />
        <Spacer height={20} />


      <ThemedText style={styles.title} title={true}>STUDY STACKS</ThemedText>

      
      <ThemedText style={styles.subTitle}>A Flashcard App</ThemedText>
      <Spacer />

      <Link href="/login" style={styles.link}>
        <ThemedText>Login</ThemedText> 
      </Link>
      <Link href="/register" style={styles.link}>
        <ThemedText>Sign Up</ThemedText>
      </Link>
      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>   
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 48
    },
    subTitle: {
      fontSize: 25
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
        },
    })