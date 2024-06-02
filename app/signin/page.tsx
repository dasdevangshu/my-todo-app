'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import LogoHeader from "../components/LogoHeader"
import Link from "next/link"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errorCode = searchParams.get('code')

  const toDisable = username === '' || password === '' || username.includes(' ') || password.includes(' ')
  const message = username.includes(' ') || password.includes(' ') ? 'Username or password cannot contain spaces' : username === '' || password === '' ? 'Username or password cannot be empty' : ''
  const message2 = errorCode !== null ? errorCode : ''

  const pStyle = 'w-4/5 md:w-2/5 text-slate-100 text-center text-md'
  const alertStyle = 'w-4/5 md:w-2/5 font-bold text-slate-100 text-center text-md animate-pulse'
  const buttonStyle = 'w-4/5 md:w-2/5 font-bold border-2 text-slate-100 border-slate-100 dark:border-rose-500 dark:hover:bg-rose-500 dark:hover:text-slate-100 rounded-md p-2 hover:bg-slate-100 hover:text-rose-500 transition duration-300'
  const inputStyle = 'w-4/5 md:w-2/5 text-rose-500 dark:text-slate-100 bg-slate-100 px-2 accent-slate-100 dark:accent-rose-500 placeholder:text-rose-400 caret-rose-400 focus:outline focus:outline-offset-2 dark:bg-slate-900 dark:placeholder:text-slate-600 text-slate-100 rounded-md focus:outline-slate-100 dark:focus:outline-rose-500 '
  
  return (
    <main className=" flex justify-center">
      <div className=" dark:bg-slate-800 dark:outline dark:outline-rose-500 bg-rose-500 shadow-md rounded-md w-4/5 max-w-5xl mt-12 md:mt-24 p-8 gap-2 flex flex-col items-center">
        <LogoHeader />
        <p className={alertStyle}>{message2}</p>
        <p className={alertStyle}>{message}</p>
        <input className={inputStyle} value={username} type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}></input>
        <input className={inputStyle} value={password} type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}></input>
        <button className={buttonStyle} disabled={toDisable} onClick={() => { signIn('credentials', { username: username, password: password }) }}>SignIn</button>
        <button className={buttonStyle} onClick={() => signIn('github')}>SignIn using Github</button>
        <p className={pStyle}>Don't have an account?</p>
        <Link className="w-full flex justify-center" href='/signup'><button className={buttonStyle}>SignUp</button></Link>
      </div>
    </main>
  )
}