'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';
import { encryptMessage } from "./encryption";

export const UpdateTitle = async (listId: string, name: string) => {
    const toEncrpt = process.env.TO_ENCRPT
    const finName = toEncrpt === 'true' ? encryptMessage(name): name;
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_lists').updateOne(
            { _id: new ObjectId(listId) },
            { $set: { listName: finName } }
        );

    } catch (error) {
        console.error('Error adding item:', error);
    }
};