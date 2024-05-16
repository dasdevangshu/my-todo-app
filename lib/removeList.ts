'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';

export const RemoveList = async (listId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_lists').deleteOne(
            { _id: new ObjectId(listId) }
        );
        db.collection('all_tasks').deleteMany(
            { listId: listId }
        );
    } catch (error) {
        console.error('Error adding item:', error);
    }
};