import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const stroke500 = {
    rose: 'dark:hover:stroke-rose-500 ',
    amber: 'dark:hover:stroke-amber-500 ',
    indigo: 'dark:hover:stroke-indigo-500 ',
    emerald: 'dark:hover:stroke-emerald-500 ',
}

const text500 = {
    rose: 'text-slate-100 dark:text-rose-500 ',
    amber: 'text-slate-100 dark:text-amber-500 ',
    indigo: 'text-slate-100 dark:text-indigo-500 ',
    emerald: 'text-slate-100 dark:text-emerald-500 ',
}

const accent500 = {
    rose: 'dark:accent-rose-500 ',
    amber: 'dark:accent-amber-500 ',
    indigo: 'dark:accent-indigo-500 ',
    emerald: 'dark:accent-emerald-500 ',
}

const outline500 = {
    rose: 'focus:outline-slate-100 dark:focus:outline-rose-500 ',
    amber: 'focus:outline-slate-100 dark:focus:outline-amber-500 ',
    indigo: 'focus:outline-slate-100 dark:focus:outline-indigo-500 ',
    emerald: 'focus:outline-slate-100 dark:focus:outline-emerald-500 ',
}

const caret500 = {
    rose: 'dark:caret-rose-500 ',
    amber: 'dark:caret-amber-500 ',
    indigo: 'dark:caret-indigo-500 ',
    emerald: 'dark:caret-emerald-500 ',
}

export default function Title(props: any) {
    const [curName, setName] = useState(props.name)
    const UpdateTitle: Function = props.UpdateTitle
    const listId: string = props.listId
    const color: string = props.color

    const tickIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[color as keyof typeof stroke500]}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
    const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[color as keyof typeof stroke500]}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    
    return (
        <div className="flex flex-col flex-1">
            <TextareaAutosize spellCheck="false" value={curName} onChange={(e) => setName(e.target.value)} className={"dark:placeholder:text-slate-600 focus:outline text-lg font-bold bg-transparent rounded-md w-full px-2 resize-none " + caret500[color as keyof typeof caret500] + text500[color as keyof typeof text500] + outline500[color as keyof typeof outline500]} placeholder='add a name to the list...' />
            {(props.name !== curName) && <div className='px-1'>
                <button className='mt-1' onClick={() => UpdateTitle(listId, curName)}>{tickIcon}</button>
                <button className='mt-1' onClick={() => setName(props.name)}>{crossIcon}</button>
            </div>}
        </div>
    )
}