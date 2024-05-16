import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    return <main className=" flex justify-center">
      <div className="border w-3/5 mt-12 flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">WhatToDo?</h1>
        <p className="text-center">Looks like you're not signed in. Want to make the most of WhatToDo? Just log in to keep your to-do lists safe and sound. Don't have an account yet? No worries, you can sign up right here.</p>
        <Link href='/signin'><button>Sign In</button></Link>
        <p className="text-center">Oh, and if you're in a hurry, you can give guest mode a shot. Just remember, any lists you whip up won't stick around once you leave.</p>
        <button>Guest Mode</button>
      </div>
    </main>;
  }

  return (
    <main className="bg-slate-400 dark:bg-slate-800 text-slate-800 dark:text-slate-400">
      <Link href='/lists'>Lists</Link>
      <Link href={'/testpage'}><h1>Serverside Test with Logout</h1></Link>
    </main>
  );
}
