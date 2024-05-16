'use server'
import clientPromise from "./mongodb";
import { encryptMessage } from "./encryption";

export const AddTask = async (listId: string) => {
    const toEncrpt = process.env.TO_ENCRPT
    const task = toEncrpt === 'true' ? encryptMessage(''): ''; 

    const newTask = {
        listId: listId,
        taskId: "",
        task: task,
        isDone: false,
    };

    try {
        const client = await clientPromise;
        const db = client.db()
        const result = await db.collection('all_tasks').insertOne(newTask);
        const { insertedId } = result

        db.collection('all_tasks').updateOne(
            { _id: insertedId },
            { $set: { taskId: insertedId } }
        );
    } catch (error) {
        console.error('Error adding item:', error);
    }
};  