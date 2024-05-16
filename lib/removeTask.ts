'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';

export const RemoveTask = async (taskId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_tasks').deleteOne(
            { _id: new ObjectId(taskId) }
        );
    } catch (error) {
        console.error('Error adding item:', error);
    }
};