'use server'
import clientPromise from "./mongodb";

export const GetTasks = async (listId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()
        let tasks = await db.collection('all_tasks').find({ listId: listId }).toArray();
        return tasks
    } catch (error) {
        console.error('Error adding item:', error);
    }
};  