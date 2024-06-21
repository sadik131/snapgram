import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: "66719f6400208384b6cd",
    url: "https://cloud.appwrite.io/v1",
    storage: "6671bf2c00009c6c019b",
    databaseUrl: "6671bfb2002acf42c756",
    save: "6671c05c003d730b2536",
    posts: "6671c04e0013b0a0772a",
    users: "6671c05300353bda9db0"
}

const client = new Client();
client
    .setProject(appwriteConfig.projectId)
    .setEndpoint(appwriteConfig.url)

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, account, databases, storage, avatars };