import { auth, signIn } from '@/auth';
import List from '../components/List';
import { GetLists } from '@/lib/getLists';
import { AddList } from '@/lib/addList';
import { revalidatePath } from 'next/cache';
import { GetAllTasks } from '@/lib/getAllTasks';
import { AddTask } from '@/lib/addTask';
import { UpdateTask } from '@/lib/updateTask';
import { RemoveTask } from '@/lib/removeTask';
import { RemoveList } from '@/lib/removeList';
import { Reset } from '@/lib/reset';
import { UpdateTitle } from '@/lib/updateTitle';
import { ChangeListColor } from '@/lib/changeListColor';
import { ResetOneList } from '@/lib/resetOneList';
import { encryptMessage, decryptMessage } from '@/lib/encryption';

export default async function Lists() {
    const session = await auth();
    if (!session || !session.user) {
        await signIn();
    }

    const user = session?.user;
    const userId = user?.id

    const toEncrpt = process.env.TO_ENCRPT

    const listsData = await GetLists(userId as string);
    const regularListsData: Array<ListType> = JSON.parse(JSON.stringify(listsData));
    const finListData: Array<ListType> = regularListsData.map((i: ListType) => toEncrpt === 'true'? {...i, listName: decryptMessage(i.listName) }: i )

    const taskData = await GetAllTasks()
    const regularTasksData: Array<TaskType> = JSON.parse(JSON.stringify(taskData));
    const finTaskData: Array<TaskType> = regularTasksData.map((i: TaskType) => toEncrpt === 'true'? {...i, task: decryptMessage(i.task) }: i )

    async function AddListClient() {
        'use server'
        AddList(userId as string)
        revalidatePath('/lists')
    }

    async function AddTaskClient(listId: string) {
        'use server'
        AddTask(listId)
        revalidatePath('/lists')
    }

    async function UpdateTaskClient(taskId: string, task: string, isDone: boolean) {
        'use server'
        UpdateTask(taskId, task, isDone)
        revalidatePath('/lists')
    }

    async function RemoveTaskClient(taskId: string) {
        'use server'
        RemoveTask(taskId)
        revalidatePath('/lists')
    }

    async function RemoveListClient(listId: string) {
        'use server'
        RemoveList(listId)
        revalidatePath('/lists')
    }

    async function UpdateTitleClient(listId: string, name: string) {
        'use server'
        UpdateTitle(listId, name)
        revalidatePath('/lists')
    }

    async function ResetOneListClient(listId: string) {
        'use server'
        ResetOneList(listId)
        revalidatePath('/lists')
    }

    async function ResetClient() {
        'use server'
        Reset()
        revalidatePath('/lists')
    }

    async function ChangeListColorClient(listId: string, color: string) {
        'use server'
        ChangeListColor(listId, color)
        revalidatePath('/lists')
    }

    return (
        // <div className='h-full w-full'>
            <List
                listData={finListData}
                taskData={finTaskData}
                AddList={AddListClient}
                AddTask={AddTaskClient}
                UpdateTask={UpdateTaskClient}
                RemoveTask={RemoveTaskClient}
                RemoveList={RemoveListClient}
                ResetOneList={ResetOneListClient}
                Reset={ResetClient}
                UpdateTitle={UpdateTitleClient}
                ChangeListColor={ChangeListColorClient} />
        // </div>
    )
}
