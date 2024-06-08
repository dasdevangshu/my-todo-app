'use client'
import { useState } from "react";
import GuestListItem from "./GuestListItem";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";

const bg300 = {
  rose: 'bg-rose-300 ',
  amber: 'bg-amber-300 ',
  indigo: 'bg-indigo-300 ',
  emerald: 'bg-emerald-300 ',
}

const stroke500 = {
  rose: 'dark:hover:stroke-rose-500 ',
  amber: 'dark:hover:stroke-amber-500 ',
  indigo: 'dark:hover:stroke-indigo-500 ',
  emerald: 'dark:hover:stroke-emerald-500 ',
}

const bg500 = {
  rose: 'bg-rose-500 ',
  amber: 'bg-amber-500 ',
  indigo: 'bg-indigo-500 ',
  emerald: 'bg-emerald-500 ',
}

const text500 = {
  rose: 'dark:text-rose-500 ',
  amber: 'dark:text-amber-500 ',
  indigo: 'dark:text-indigo-500 ',
  emerald: 'dark:text-emerald-500 ',
}

const hovertext500 = {
  rose: 'dark:hover:text-rose-500 ',
  amber: 'dark:hover:text-amber-500 ',
  indigo: 'dark:hover:text-indigo-500 ',
  emerald: 'dark:hover:text-emerald-500 ',
}

const outline400 = {
  rose: 'dark:outline-rose-400 ',
  amber: 'dark:outline-amber-400 ',
  indigo: 'dark:outline-indigo-400 ',
  emerald: 'dark:outline-emerald-400 ',
}

const outline500 = {
  rose: 'dark:outline-rose-500 ',
  amber: 'dark:outline-amber-500 ',
  indigo: 'dark:outline-indigo-500 ',
  emerald: 'dark:outline-emerald-500 ',
}

const accent500 = {
  rose: 'dark:accent-rose-500 ',
  amber: 'dark:accent-amber-500 ',
  indigo: 'dark:accent-indigo-500 ',
  emerald: 'dark:accent-emerald-500 ',
}

const caret500 = {
  rose: 'dark:caret-rose-500 ',
  amber: 'dark:caret-amber-500 ',
  indigo: 'dark:caret-indigo-500 ',
  emerald: 'dark:caret-emerald-500 ',
}

export default function GuestList() {

  const [listData, setListData] = useState<GuestListType[]>([{
    listId: Date.now().toString(),
    listName: 'New List',
    color: 'rose'
  }])

  const [taskData, setTaskData] = useState<GuestTaskType[]>([])

  const [curInd, setCurInd] = useState(0)
  const curList = listData[curInd]

  function findIni(str: string) {
    const words = str.trim().split(' ')
    const ini = words[0][0]
    return ini === undefined ? 'X' : ini.toUpperCase()
  }

  function AddList() {
    setListData((prev) => [...prev, {
      listId: Date.now().toString(),
      listName: 'New List',
      color: 'rose'
    }])
    setCurInd(listData.length)
  }

  function AddTask(listId: string) {
    const newTask: GuestTaskType = {
      taskId: Date.now().toString(),
      task: '',
      isDone: false,
      listId: listId,
    }
    setTaskData((prev) => [...prev, newTask])
  }

  function RemoveList(listId: string) {
    setListData((prev) => prev.filter((i) => i.listId !== listId))
    setTaskData((prev) => prev.filter((i) => i.listId !== listId))
    setCurInd((prev) => listData.findIndex((i) => i.listId === listId) === 0 ? prev === 0 ? 0 : prev - 1 : listData.findIndex((i) => i.listId === listId) <= prev ? prev - 1 : prev)
  }

  function UpdateTitle(listId: string, newName: string) {
    setListData((prev) => prev.map((i) => i.listId === listId ? { ...i, listName: newName } : i))
    setTempName(newName)
  }

  function UpdateTask(taskId: string, task: string, isDone: boolean) {
    setTaskData((prev) => prev.map((i) => i.taskId === taskId ? { ...i, task: task, isDone: isDone } : i))
  }

  function RemoveTask(taskId: string) {
    setTaskData((prev) => prev.filter((i) => i.taskId !== taskId))
  }

  function ChangeColor(listId: string, color: string) {
    setListData((prev) => prev.map((i) => i.listId === listId ? { ...i, color: color } : i))
  }

  function ResetOneList(listId: string) {
    setListData((prev) => prev.map((i) => i.listId !== listId ? i : { ...i, listName: 'New List' }))
    setCurName('New List')
    setTempName('New List')
    setTaskData((prev) => prev.filter((i) => i.listId !== listId))
  }

  function Reset() {
    setCurInd(0)
    setListData([{
      listId: Date.now().toString(),
      listName: 'New List',
      color: 'rose'
    }])
    setTaskData([])
    setCurName('New List')
    setTempName('New List')
  }


  const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[curList.color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>

  const plusIcon2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 dark:stroke-slate-300 stroke-slate-100 "}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>

  const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>

  const resetIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"dark:stroke-slate-300 w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

  const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[curList.color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>

  const tickIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[curList.color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
  const crossIcon2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"hover:scale-110 hover:stroke-slate-100 ease-in-out duration-300 w-6 h-6 stroke-slate-300 " + stroke500[curList.color as keyof typeof stroke500]}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>

  //list changer component
  const listChanger = listData.map((item: any) => {
    const isSelected = curList.listId === item.listId
    const enlarge = isSelected ? 'scale-110 mb-2 ' : 'scale-90 '
    const outline = isSelected ? 'dark:outline outline ' : 'dark:outline dark:outline-2 hover:outline hover:dark:outline-4 '
    const outlineColor = isSelected ? outline500[item.color as keyof typeof outline500] : outline400[item.color as keyof typeof outline400]
    const color = ('dark:bg-slate-800 ' + bg500[item.color as keyof typeof bg500])
    // const outline = outline400[item.color as keyof typeof outline400]

    return <div onClick={() => { changeCurList(item.listId) }} className={"shrink-0 ease-in-out duration-300 shadow-md cursor-pointer rounded-full size-12 flex justify-center items-center select-none relative " + enlarge + color + outline + outlineColor} key={item.listId}>
      {findIni(item.listName)}
      {listData.length !== 1 && <button onClick={(e) => {e.stopPropagation();RemoveList(item.listId)}} className="shadow-md hover:scale-110 ease-in-out duration-300 absolute -top-2 -right-2 bg-rose-500 rounded-full">{crossIcon}</button>}
    </div>
  })

  const curTaskData = taskData.filter((item: any) => item.listId === curList.listId)
  const curTasks = curTaskData.map((item: any) => <GuestListItem UpdateTask={UpdateTask} RemoveTask={RemoveTask} key={item.taskId} data={item} color={curList.color} />)


  const [curName, setCurName] = useState(curList.listName)
  const [tempName, setTempName] = useState(curList.listName)

  const curTitle = <div className="flex flex-col flex-1">
    <TextareaAutosize spellCheck="false" value={curName} onChange={(e) => setCurName(e.target.value)} className={"dark:placeholder:text-slate-600 focus:outline text-lg font-bold bg-transparent rounded-md w-full px-2 resize-none " + caret500[curList.color as keyof typeof caret500] + text500[curList.color as keyof typeof text500] + outline500[curList.color as keyof typeof outline500]} placeholder='add a name to the list...' />
    {(tempName !== curName) && <div className='px-1'>
      <button className='mt-1' onClick={() => UpdateTitle(curList.listId, curName)}>{tickIcon}</button>
      <button className='mt-1' onClick={() => setCurName(tempName)}>{crossIcon2}</button>
    </div>}
  </div>

  const colorChanger = Object.keys(bg500).map((color: string, index) => <button onClick={() => ChangeColor(curList.listId, color)} key={index} className={"hover:scale-110 ease-in-out duration-300 size-4 md:size-6 lg:size-8 rounded-full dark:border-slate-300 border-slate-100 border-2 " + bg500[color as keyof typeof bg500]}></button>)

  const header = <div className="flex mb-1 lg:mb-0">
    {curTitle}
    <div className="mx-2 flex flex-row gap-0.5 justify-center items-center">
      <button onClick={() => ResetOneList(curList.listId)} className={"md:text-md lg:text-lg text-sm ease-in-out duration-300 mr-1 text-slate-300 hover:text-slate-100 " + hovertext500[curList.color as keyof typeof hovertext500]}>Reset</button>
      {colorChanger}
    </div>
  </div>

function changeCurList(listId: string) {
  const newInd = listData.findIndex((item: any) => item.listId === listId)
  setCurInd(newInd)
  setCurName(listData[newInd].listName)
  setTempName(listData[newInd].listName)
}

  return (
    <div className="flex flex-row h-full">

      <div className=" flex-none overflow-y-auto overflow-x-hidden flex flex-col gap-2 p-4 pl-5 pr-4">
        {listChanger}
        <button onClick={() => AddList()} className="hover:outline ease-in-out duration-300 scale-90 shrink-0 shadow-md rounded-full size-12 dark:bg-slate-600 bg-slate-500 flex justify-center items-center">{plusIcon2}</button>
      </div>

      <div className="flex flex-col flex-grow p-2 gap-2">

        <div className="flex items-center justify-center mb-0.5 relative">
          <Link href='/'><div className="absolute top-0 left-1">
            {backIcon}
          </div></Link>
          <button onClick={() => Reset()} className="flex gap-2 dark:text-slate-300" >{resetIcon}Reset all lists</button>
        </div>

        <div className={'flex-1 overflow-auto dark:outline dark:bg-slate-800 flex flex-col gap-1 w-full rounded-md shadow-md p-4 ' + bg500[curList.color as keyof typeof bg500] + outline500[curList.color as keyof typeof outline500]} >
          {header}
          {curTasks}
          <div>
            <button onClick={() => AddTask(curList.listId)}>{plusIcon}</button>
          </div>
        </div>

      </div>
    </div>
  )
}