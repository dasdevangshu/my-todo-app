import { auth } from '@/auth';
import GuestList from '../components/GuestList';
import LogoHeader from '../components/LogoHeader';
import Link from 'next/link';

export default async function GuestLists() {
    const session = await auth();
    const user = session?.user;
    const userId = user?.id

    const pStyle = 'text-slate-100 text-center text-md'
    const buttonStyle = 'font-bold border-2 text-slate-100 border-slate-100 dark:border-rose-500 dark:hover:bg-rose-500 dark:hover:text-slate-100 rounded-md p-2 hover:bg-slate-100 hover:text-rose-500 transition duration-300'

    if (userId) {
        return (<main className=" flex justify-center">
        <div className=" dark:bg-slate-800 dark:outline dark:outline-rose-500 bg-rose-500 shadow-md rounded-md w-4/5 max-w-5xl mt-12 md:mt-24 p-8 gap-2 flex flex-col items-center">
          <LogoHeader />
          <p className={pStyle}>It looks like you&apos;re already logged in. Your lists have been saved. Open your lists to start using WhatToDo!</p>
          <Link href='/lists'><button className={buttonStyle}>Lists</button></Link>
        </div>
      </main>)
    }

    return (
        <GuestList />
    )
}