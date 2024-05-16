import SwitchLightDark from "@/app/components/SwitchLightDark";
import Link from "next/link";

export default function Navbar() { 

    const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-slate-100 dark:fill-slate-300">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  

    return (
        <nav className="flex justify-between items-center px-24 py-2 shadow-md z-10 bg-slate-900 dark:bg-slate-950">
            <Link href='/'><div className="flex flex-row gap-0.5 items-center">{checkIcon}<h1 className="select-none text-xl font-extrabold text-slate-100 dark:text-slate-300">WhatToDo?</h1></div></Link>           
            <SwitchLightDark />
        </nav>
    )
}