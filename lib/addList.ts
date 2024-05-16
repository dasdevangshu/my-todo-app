'use server'
import clientPromise from "./mongodb";
import { encryptMessage } from "./encryption";

export const AddList = async (userId: string) => {
    const toEncrpt = process.env.TO_ENCRPT
    const listName = toEncrpt === 'true' ? encryptMessage('New List'): 'New List'; 

    const newList = {
        userId: userId,
        listId: "",
        listName: listName,
        color: 'rose'
    };

    try {
        const client = await clientPromise;
        const db = client.db()
        const result = await db.collection('all_lists').insertOne(newList);
        const { insertedId } = result

        db.collection('all_lists').updateOne(
            { _id: insertedId },
            { $set: { listId: insertedId } }
        );

        return insertedId;
        
    } catch (error) {
        console.error('Error adding item:', error);
    }
};  