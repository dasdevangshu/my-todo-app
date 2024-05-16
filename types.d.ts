import type { MongoClient } from 'mongodb'

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }

  type ListType = {
    _id: string,
    userId: string,
    listId: string,
    listName: string,
    color: string
  };

  type TaskType = {
    _id: string,
    listId: string,
    taskId: string,
    task: string,
    isDone: boolean
  };
}



