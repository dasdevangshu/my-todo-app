'use server'
import clientPromise from "./mongodb";
import { CheckUsername } from "./checkUsername";
import { encryptMessage } from "./encryption";
import { redirect } from 'next/navigation'

export const AddUser = async (username: string, password: string) => {
    const toEncrpt = process.env.TO_ENCRPT
    const encryptedPassword = toEncrpt === 'true' ? encryptMessage(password): password; 

    const newUser = {
        name: username,
        password: encryptedPassword,
    };

    const users = await CheckUsername(username)
    if (users!== null) {
        redirect('/signup?error=CredentialsSignup&code=Username+Already+Taken')
    }

    try {
        const client = await clientPromise;
        const db = client.db()
        const result = await db.collection('users').insertOne(newUser);
    } catch (error) {
        console.error('Error adding item:', error);
    }
    redirect('/signin?error=None&code=You+have+successfully+signed+up.+Please+sign+in.')
};  