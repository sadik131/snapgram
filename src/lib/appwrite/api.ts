// type User = {
//     id: string,
//     email: string,
//     password: string

import { NewUser } from "@/types/typs";
import { account, appwriteConfig, avatars, databases } from "./appConfig";
import { ID, Query } from "appwrite";

export async function createUser(user: NewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username,
        )
        if (!newAccount) {
            throw Error
        }
        const avatar = avatars.getInitials(user.username)
        const saveUser = await savedUserToDb({
            accountId: newAccount.$id,
            userName: user.username,
            email: newAccount.email,
            imageUrl: avatar
        })
        return saveUser
    } catch (error) {
        console.log(error)
    }
}

export async function savedUserToDb(user: {
    accountId: string
    userName: string
    email: string
    imageUrl: URL
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseUrl,
            appwriteConfig.users,
            ID.unique(),
            user
        )
        return newUser
    } catch (error) {
        console.log(error)
    }
}

export async function signInUser(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        return session
    } catch (error) {
        alert(error)
    }
}

export async function getCurrentUser() {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseUrl,
        appwriteConfig.users,
        [Query.equal("accountId", currentAccount.$id)]
    )
    if(!currentUser) throw Error
    return currentUser.documents[0]
}