'use server'
import clientPromise from "./mongodb";
import { ObjectId } from 'mongodb';
import { encryptMessage } from "./encryption";

export const UpdateTask = async (taskId: string, task: string, isDone: boolean) => {
    const toEncrpt = process.env.TO_ENCRPT
    const finTask = toEncrpt === 'true' ? encryptMessage(task): task; 
    
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_tasks').updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { task: finTask, isDone: isDone } }
        );

    } catch (error) {
        console.error('Error adding item:', error);

    }
};