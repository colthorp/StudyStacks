import { Stack } from "expo-router"
import { Colors } from "../constants/colors"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"
import { UserProvider } from "../contexts/userContext"
import { StacksProvider } from "../contexts/stacksContext"
import { CardsProvider } from "../contexts/cardContext"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserProvider>
      <StacksProvider>
        <CardsProvider>
          <StatusBar value="auto" />
          <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
          }}>

            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />

          </Stack>
        </CardsProvider>
      </StacksProvider>
    </UserProvider>
  )
}