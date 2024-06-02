'use server'
import clientPromise from "./mongodb";

export const CheckUsername = async (username: string) => {

    const user = { name: username };
    try {
        const client = await clientPromise;
        const db = client.db()
        const result = await db.collection('users').findOne(user);
        return result;
    } catch (error) {
        console.error('Error adding item:', error);
    }
};  