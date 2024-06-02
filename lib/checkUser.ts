'use server'
import clientPromise from "./mongodb";
import { decryptMessage } from "./encryption";

export const CheckUser = async (username: string, password: string) => {
    const toEncrpt = process.env.TO_ENCRPT

    const user = { name: username};
    try {
        const client = await clientPromise;
        const db = client.db()
        const result = await db.collection('users').findOne(user);
        if (result === null) {
            return null
        }
        else {
            const decryptedPassword = toEncrpt === 'true' ? decryptMessage(result?.password): result.password
            if (decryptedPassword === password) {
                return result
            }
            else {
                return null
            }
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
};  