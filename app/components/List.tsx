'use client'
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Title from "./Title";
import Link from "next/link";

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

export default function List(props: any) {

  const listData: Array<ListType> = props.listData
  const taskData: Array<TaskType> = props.taskData

  const [curInd, setCurInd] = useState(0)
  const curList = listData[curInd]

  const [isAdded, setIsAdded] = useState(false);

  function findIni(str: string) {
    const words = str.trim().split(' ')
    const ini = words[0][0]
    return ini === undefined ? 'X' : ini.toUpperCase()
  }

  const AddList: Function = props.AddList
  async function HandleAddList() {
    await AddList()
    setIsAdded(true)
  }

  const AddTask: Function = props.AddTask
  const UpdateTask: Function = props.UpdateTask
  const RemoveTask: Function = props.RemoveTask

  const RemoveList: Function = props.RemoveList
  function HandleRemoveList(id: string) {
    RemoveList(id)
    setCurInd((prev) => listData.findIndex((i) => i._id === id) === 0 ? prev===0?0 : prev-1 : listData.findIndex((i) => i._id === id) <= prev ? prev - 1 : prev)
  }

  const ResetOneList: Function = props.ResetOneList

  const Reset: Function = props.Reset
  function HandleReset() {
    Reset()
    setCurInd(0)
  }

  const UpdateTitle: Function = props.UpdateTitle
  const ChangeListColor: Function = props.ChangeListColor

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


  //sets the curList to the newest listData item
  useEffect(() => {
    if (isAdded) {
      setCurInd(listData.length - 1)
      setIsAdded(false)
    }
  }, [listData.length])

  function changeCurList(listId: string) {
    const newInd = listData.findIndex((item: any) => item._id === listId)
    setCurInd(newInd)
  }

  //list changer component
  const listChanger = listData.map((item: any) => {
    const isSelected = curList._id === item._id
    const enlarge = isSelected ? 'scale-110 mb-2 ' : 'scale-90 '
    const outline = isSelected ? 'dark:outline outline ' : 'dark:outline dark:outline-2 hover:outline hover:dark:outline-4 '
    const outlineColor = isSelected ? outline500[item.color as keyof typeof outline500] : outline400[item.color as keyof typeof outline400]
    const color = ('dark:bg-slate-800 ' + bg500[item.color as keyof typeof bg500])

    return <div onClick={() => { changeCurList(item._id) }} className={"shrink-0 ease-in-out duration-300 shadow-md cursor-pointer rounded-full size-12 flex justify-center items-center select-none relative " + enlarge + color + outline + outlineColor} key={item._id}>
      {findIni(item.listName)}
      {listData.length !== 1 && <button className="shadow-md hover:scale-110 ease-in-out duration-300 absolute -top-2 -right-2 bg-rose-500 rounded-full" onClick={(e) => { e.stopPropagation(); HandleRemoveList(item._id) }}>{crossIcon}</button>}
    </div>
  })

  const curTaskData = taskData.filter((item: any) => item.listId === curList.listId)
  const curTasks = curTaskData.map((item: any) => <ListItem key={item._id} data={item} color={curList.color} UpdateTask={UpdateTask} RemoveTask={RemoveTask} />)

  const curTitle = [curList].map((item: any) => <Title key={item._id} name={item.listName} color={curList.color} listId={item._id} UpdateTitle={UpdateTitle} />)

  const colorChanger = Object.keys(bg500).map((color: string, index) => <button key={index} onClick={() => ChangeListColor(curList._id, color)} className={"hover:scale-110 ease-in-out duration-300 size-4 md:size-6 lg:size-8 rounded-full dark:border-slate-300 border-slate-100 border-2 " + bg500[color as keyof typeof bg500]}></button>)

  const header = <div className="flex mb-1 lg:mb-0">
    {curTitle}
    <div className="mx-2 flex flex-row gap-0.5 justify-center items-center">
      <button className={"md:text-md lg:text-lg text-sm ease-in-out duration-300 mr-1 text-slate-300 hover:text-slate-100 " + hovertext500[curList.color as keyof typeof hovertext500]} onClick={() => ResetOneList(curList._id)}>Reset</button>
      {colorChanger}
    </div>
  </div>

  return (
    <div className="flex flex-row h-full">

      <div className=" flex-none overflow-y-auto overflow-x-hidden flex flex-col gap-2 p-4 pl-5 pr-4">
        {listChanger}
        <button className="hover:outline ease-in-out duration-300 scale-90 shrink-0 shadow-md rounded-full size-12 dark:bg-slate-600 bg-slate-500 flex justify-center items-center" onClick={() => HandleAddList()}>{plusIcon2}</button>
      </div>

      <div className="flex flex-col flex-grow p-2 gap-2">

        <div className="flex items-center justify-center mb-0.5 relative">
          <Link href='/'><div className="absolute top-0 left-1">
            {backIcon}
          </div></Link>
          <button className="flex gap-2 dark:text-slate-300" onClick={() => { HandleReset() }}>{resetIcon}Reset all lists</button>
        </div>

        <div className={'flex-1 overflow-auto dark:outline dark:bg-slate-800 flex flex-col gap-1 w-full rounded-md shadow-md p-4 ' + bg500[curList.color as keyof typeof bg500] + outline500[curList.color as keyof typeof outline500]} >
          {header}
          {curTasks}
          <div>
            <button onClick={() => AddTask(curList._id)}>{plusIcon}</button>
          </div>
        </div>

      </div>
    </div>
  )
}