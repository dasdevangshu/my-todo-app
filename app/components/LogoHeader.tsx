'use client'

import { useState } from "react"

export default function LogoHeader() {

    const [count, setCount] = useState(0)
    const iconSizeStyle = ' w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 '

    const checkIcon = <svg onClick={() => setCount((prev) => prev < 10 ? prev + 1 : prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconSizeStyle + " fill-slate-100 dark:fill-slate-300"}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
    const smileIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconSizeStyle + " animate-spin"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>

    const showIcon = count >= 10 ? smileIcon : checkIcon
    const logoText = count >= 10 ? 'NothingToDo': 'WhatToDo?'


    return (
        <div className=" flex flex-wrap justify-center items-center">
            {showIcon}
            <h1 className=" text-slate-100 text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none">{logoText}</h1>
        </div>
    )
}