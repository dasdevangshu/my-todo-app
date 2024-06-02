import Link from "next/link";
import { auth, signOut } from "@/auth";
import LogoHeader from "./components/LogoHeader";

export default async function Home() {
  const session = await auth();

  const pStyle = 'text-slate-100 text-center text-md'
  const buttonStyle = 'font-bold border-2 text-slate-100 border-slate-100 dark:border-rose-500 dark:hover:bg-rose-500 dark:hover:text-slate-100 rounded-md p-2 hover:bg-slate-100 hover:text-rose-500 transition duration-300'

  if (!session || !session.user) {
    return (<main className=" flex justify-center">
      <div className=" dark:bg-slate-800 dark:outline dark:outline-rose-500 bg-rose-500 shadow-md rounded-md w-4/5 max-w-5xl mt-12 md:mt-24 p-8 gap-2 flex flex-col items-center">
        <LogoHeader />
        <p className={pStyle}>Looks like you&apos;re not signed in. Want to make the most of WhatToDo? Just log in to keep your to-do lists safe and sound.</p>
        <Link href='/signin'><button className={buttonStyle}>SignIn</button></Link>
        <p className={pStyle}>Don&apos;t have an account yet? No worries, you can sign up right here.</p>
        <Link href='/signup'><button className={buttonStyle}>SignUp</button></Link>
        <p className={pStyle}>Oh, and if you&apos;re in a hurry, you can give guest mode a shot. Just remember, any lists you whip up won&apos;t stick around once you leave.</p>
        <Link href='/guest-mode'><button className={buttonStyle}>Guest Mode</button></Link>
      </div>
    </main>)
  }

  return (
    <main className=" flex justify-center">
      <div className=" dark:bg-slate-800 dark:outline dark:outline-rose-500 bg-rose-500 shadow-md rounded-md w-4/5 max-w-5xl mt-12 md:mt-24 p-8 gap-2 flex flex-col items-center">
        <LogoHeader />
        <p className={pStyle}>Hey {session.user.name}! Welcome back!</p>
        <p className={pStyle}>WhatToDo? is ready for use.</p>
        <Link href='/lists'><button className={buttonStyle}>Open Lists</button></Link>
        <form action={async () => { 'use server'; return signOut() }}>
          <button type="submit" className={buttonStyle}>Log Out</button>
        </form>
      </div>
    </main>
  );
}