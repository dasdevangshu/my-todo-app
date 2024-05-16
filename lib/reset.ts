'use server'
import clientPromise from "./mongodb";

export const Reset = async () => {
    try {
        const client = await clientPromise;
        const db = client.db()

        db.collection('all_lists').deleteMany();
        db.collection('all_tasks').deleteMany();
    } catch (error) {
        console.error('Error adding item:', error);
    }
};