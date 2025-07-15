import { Client, Account, Avatars, Databases } from 'react-native-appwrite'

export const client = new Client()
    .setProject('685b0a2a0035e639acb5')
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setPlatform('dev.rc.studystacks');

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)


