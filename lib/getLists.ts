'use server'
import { AddList } from "./addList";
import clientPromise from "./mongodb";

export const GetLists = async (userId: string) => {
    try {
        const client = await clientPromise;
        const db = client.db()
        let lists = await db.collection('all_lists').find({ userId: userId }).toArray();

        if (lists?.length === 0) {
            await AddList(userId);
        }

        lists = await db.collection('all_lists').find({ userId: userId }).toArray();

        return lists

    } catch (error) {
        console.error('Error adding item:', error);
    }
};  