'use server'
import clientPromise from "./mongodb";

export const GetAllTasks = async () => {
    try {
        const client = await clientPromise;
        const db = client.db()
        let tasks = await db.collection('all_tasks').find().toArray();

        return tasks
        
    } catch (error) {
        console.error('Error adding item:', error);
    }
};  