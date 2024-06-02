'use server'
import { AddList } from "./addList";
import clientPromise from "./mongodb";

export const Reset = async (userId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()
        const listsToDeleteProm = db.collection('all_lists').find({ userId: userId })
        const listToDelete = await listsToDeleteProm.toArray()
        db.collection('all_lists').deleteMany({ userId: userId });
        await AddList(userId);
        listToDelete.forEach((item) => {db.collection('all_tasks').deleteMany({listId: JSON.parse(JSON.stringify(item.listId))});})
    } catch (error) {
        console.error('Error adding item:', error);
    }
};