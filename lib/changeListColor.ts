'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';

export const ChangeListColor = async (listId: string, color: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_lists').updateOne(
            { _id: new ObjectId(listId) },
            { $set: { color: color } }
        );
    } catch (error) {
        console.error('Error adding item:', error);
    }
};