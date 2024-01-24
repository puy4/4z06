"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import { AblyProvider} from "ably/react"
import * as Ably from 'ably'
import Logo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { PowerIcon } from '@heroicons/react/24/outline';
import React, { useState }  from 'react';
import Dashboard  from './dashboard';
import type { NextPage } from 'next';
import Logger , { LogEntry } from '../components/logger';
import { useChannel } from "ably/react"
import { MouseEventHandler, MouseEvent} from 'react'

export default function Authentication() {
  const { user, error, isLoading } = useUser();
  const client = new Ably.Realtime.Promise ({ authUrl: '/token', authMethod: 'POST' });

  return (
    <AblyProvider client={client}>

      {user?(<><Dashboard key="dashboard" /><Chat key="chat" /><SignOut key="signOut" /></>):<UnAuth key="unauth" />}

    </AblyProvider>
  )
}


const UnAuth: NextPage  = () => {
  return(    
  <main className="flex min-h-screen flex-col p-6">

  <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52">
    <Logo></Logo>
  </div> 
  <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
    <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
      <Link
        href="/api/auth/login"
       
        className="flex items-center gap-5 self-start rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </div>
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">

      <Image
        src="/poker2.svg"
        width={500}
        height={500}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"

      />
    </div>
      <Image
        src="/poker.svg"
        width={200}
        height={200}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
        priority  
      />
  </div>
</main>

  )
}

const SignOut: NextPage  = () => {
  return(         
     <Link href="/api/auth/logout">
  <button  className="flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
    <PowerIcon className="w-6" />
    <div className="hidden md:block">Sign Out</div>
  </button>
  </Link>

    )
}

const Chat = () => {

  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const { channel} = useChannel("chat", (message: Ably.Types.Message) => {
    setLogs(prev => [...prev, new LogEntry(`${message.data.text}`,`${message.clientId}: `)])
  });
  const [messageText, setMessageText] = useState<string>('A message')
  const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return
    channel.publish('update', {text: `${messageText} `})
    console.log(channel.name)
    
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 h-[138px]">
        <div className="font-manrope text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">Message text</span>
        </div>
        <input id="username"  autoComplete='A message' className="font-manrope px-3 rounded-md items-center text-base min-w-[720px] w-[752px] whitespace-nowrap text-zinc-800 text-opacity-100 leading-6 font-light h-12 border-zinc-300 border-solid border bg-neutral-100" value={messageText}  onChange={e => setMessageText(e.target.value)} />
        <div className="flex flex-row justify-start items-start gap-4 w-[368px]">
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-blue-600">
            <div className="font-manrope text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromClientHandler}>Send</button>
            </div>
          </div>
        </div>
      </div>
      <Logger logEntries={logs}  displayHeader={true}  />
    </>
    
  )
}
