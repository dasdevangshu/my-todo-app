'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';

export const ResetOneList = async (listId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_tasks').deleteMany(
            { listId: listId }
        );
    } catch (error) {
        console.error('Error adding item:', error);
    }
};