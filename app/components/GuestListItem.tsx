'use client'
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const bg300 = {
  rose: 'bg-rose-300 ',
  amber: 'bg-amber-300 ',
  indigo: 'bg-indigo-300 ',
  emerald: 'bg-emerald-300 ',
}

const bg600 = {
  rose: 'bg-rose-600 ',
  amber: 'bg-amber-600 ',
  indigo: 'bg-indigo-600 ',
  emerald: 'bg-emerald-600 ',
}

const placeholder400 = {
  rose: 'placeholder:text-rose-400 ',
  amber: 'placeholder:text-amber-400 ',
  indigo: 'placeholder:text-indigo-400 ',
  emerald: 'placeholder:text-emerald-400 ',
}

const accent400 = {
  rose: 'accent-slate-100 dark:accent-rose-500 ',
  amber: 'accent-slate-100 dark:accent-amber-500 ',
  indigo: 'accent-slate-100 dark:accent-indigo-500 ',
  emerald: 'accent-slate-100 dark:accent-emerald-500 ',
}

const caret400 = {
  rose: 'caret-rose-400 ',
  amber: 'caret-amber-400 ',
  indigo: 'caret-indigo-400 ',
  emerald: 'caret-emerald-400 ',
}

const outline500 = {
  rose: 'focus:outline-slate-100 dark:focus:outline-rose-500 ',
  amber: 'focus:outline-slate-100 dark:focus:outline-amber-500 ',
  indigo: 'focus:outline-slate-100 dark:focus:outline-indigo-500 ',
  emerald: 'focus:outline-slate-100 dark:focus:outline-emerald-500 ',
}

const stroke500 = {
  rose: 'dark:hover:stroke-rose-500 ',
  amber: 'dark:hover:stroke-amber-500 ',
  indigo: 'dark:hover:stroke-indigo-500 ',
  emerald: 'dark:hover:stroke-emerald-500 ',
}

export default function GuestListItem(props: any) {
  const taskData: TaskType = props.data
  const color: string = props.color
  const UpdateTask: Function = props.UpdateTask
  const RemoveTask: Function = props.RemoveTask

  const tickIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
  const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
  const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>

  const [curTaskData, setCurTaskData] = useState(taskData.task)
  const [curIsDone, setCurIsDone] = useState(taskData.isDone)

  const isUnderline = curIsDone === true && curTaskData !== '' ? 'line-through ' : ''

  return (
    <div className='w-full'>
      <div className='w-full flex items-center gap-1'>
        <input type='checkbox' className={accent400[color as keyof typeof accent400]} onChange={(e) => {setCurIsDone(e.target.checked); UpdateTask(taskData._id, curTaskData, e.target.checked)}}></input>
        <TextareaAutosize spellCheck="false" className={" focus:outline dark:bg-slate-900 dark:placeholder:text-slate-600 text-slate-100 rounded-md lg:w-8/12 w-11/12 px-2 resize-none " + isUnderline + accent400[color as keyof typeof accent400] + caret400[color as keyof typeof caret400] + outline500[color as keyof typeof outline500] + bg600[color as keyof typeof bg600] + placeholder400[color as keyof typeof placeholder400]} placeholder='add a task...' value={curTaskData} onChange={(e) => setCurTaskData(e.target.value)} />
        <button className=' ' onClick={() => RemoveTask(taskData.taskId)}>{trashIcon}</button>
      </div>

      {(taskData.task !== curTaskData) && <div className='flex '>
        <button className='mt-1' onClick={() => UpdateTask(taskData.taskId, curTaskData, curIsDone)}>{tickIcon}</button>
        <button className='mt-1' onClick={() => setCurTaskData(taskData.task)}>{crossIcon}</button>
      </div>}
    </div>
  )
}