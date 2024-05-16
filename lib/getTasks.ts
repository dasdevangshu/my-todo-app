'use server'
import clientPromise from "./mongodb";

export const GetTasks = async (listId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()
        let tasks = await db.collection('all_tasks').find({ listId: listId }).toArray();
        //console.log(lists)
        //console.log('Returning now', tasks, 'for', listId)
        return tasks
        // Handle success (optional: UI feedback, data updates)
    } catch (error) {
        console.error('Error adding item:', error);
        // Handle error (optional: UI feedback, error messages)
    }
};  