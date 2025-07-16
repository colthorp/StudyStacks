# STUDY STACKS

Link: https://studystacks.netlify.app/



## Project Overview: Brief description of the project.
   * This app was built using React-Native and tested with Expo-go on a Apple device
   * I chose to create ‘Study Stacks’ to have as an on-the-go studying tool. For all levels of my schooling, I would always write out my version of flashcards on my mom’s spare recipe cards. Will all that I had learned throughout this bootcamp, I figured I’d try my best shot at making a mobile version to have with me anywhere I go.
   * This app uses appwrite for the database, allowing the user to sign up or login to access their account where they can title their own themed ‘Stacks.’  Within these Stacks, the user can create their own cards, with a front-side and back-side for each one. Once done, the user can hit the study stacks button which takes the user to the study page, going through each card in the deck. Tapping the card flips it, revealing the answer while the arrows go through the cards in the deck

## Features: List of features implemented.
   * Dark/light theme depending on the user’s current theme
   * Sign in, Sign up and logout
   * SafeAreaView 
   * Cardflip like animation 

## Installation Instructions: Steps to set up the project locally.
   * **Prerequisites:**
      * Expo Go App on a mobile Device
      * Node.js
      * Git
      * Expo 
   * Clone repository: git clone https://github.com/colthorp/StudyStacks.git
      * cd StudyStacks
   * Npm Install
   * Npx expo start
   * Scan the Barcode
   * Control+C to stop

## Usage: How to use the application.
   * Once up and running, the app will bring you to the home page where the user can either Sign-up, Sign-in or go to their profile page.
     *If the user isn’t sign in, the profile page will redirect them to the sign-in page
   * Once signed in the user will have access to 3 tabs:
      * **Profile:** where the current signed in user’s email is displayed and the logout button
      * **Create:** Where the user can create their different Stacks and add in a small description. (Different subjects or categories was the thought behind this)
      * **Stacks:** where the user can view their created Stacks
        * When the user presses into a Stack, they will be able to add cards; having both the front-side(Question) and a back-side(answer) fully customizable. User can then edit or delete the cards as well as delete the entire stack
        * The ‘Study Stacks’ button also is within the stack. This is where the user gets to study their cards. Viewing one side of the card to start, the reverse side will show once the card is tapped. Arrows are used to go to the next/previous card.

## Technologies Used: List of technologies, libraries, and frameworks used.
   * VS Code
   * Appwrite
   * Expo, Expo Router
   * React-Native
   * Netlify

## Future Improvements: Areas for potential enhancements and additional features.
   * A full screen ‘Study Stack’ – user turns phone horizontal using taps to flip card and swipes to navigate through different cards
   * The ability to share and receive stacks with other users
   * More to the Profile page
   * Swipe to delete options
   * Flag or star those harder cards to come back to
   * Shuffle cards
   * Different colour themes/card background options – not necessary but makes studying a little more fun!
