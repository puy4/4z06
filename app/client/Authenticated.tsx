"use client"

import { AblyProvider} from "ably/react"
import * as Ably from 'ably'


import React, { Dispatch, SetStateAction, useState }  from 'react';
import Dashboard  from './dashboard';
import type { NextPage } from 'next';

import { useChannel } from "ably/react"
import { MouseEventHandler, MouseEvent} from 'react'
import { Button, Textarea, Spacer, Listbox, ListboxItem, ScrollShadow, Divider} from "@nextui-org/react";

interface AuthenticatedProps {
  setGame: React.Dispatch<React.SetStateAction<string>>
  gameSelected:string
}

class LogEntry {
  public timestamp: string
  public timemili: string
  public message: string
  public id: string

  constructor(message: string,id:string) {
    this.timestamp = new Date().toLocaleString()
    const d = new Date();
    this.timemili = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
    this.message = message
    this.id = id
  }
}



const Authenticated:NextPage<AuthenticatedProps> = ({setGame,gameSelected}) => {

  const client = new Ably.Realtime.Promise ({ authUrl: '/token', authMethod: 'POST' });

  return (
    <AblyProvider client={client}>

      <><Dashboard setGame={setGame} gameSelected={gameSelected} key="dashboard" />
      <Divider className="my-12" />
      <Chat key="chat" /></>

    </AblyProvider>
  )
}



const Chat = () => {

  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const { channel} = useChannel("chat", (message: Ably.Types.Message) => {
    setLogs(prev => [new LogEntry(`${message.data.text}`,`${message.clientId}: `), ...prev])
  });
  const [messageText, setMessageText] = useState<string>('A message')
  const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return
    channel.publish('update', {text: `${messageText} `})
    console.log(channel.name)
    
  }
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
};

  return (
    <div className="flex items-center flex-col flex-row">
      

      
      <h1 className={`mb-4 text-xl md:text-2xl`}>
          Chat 
      </h1>

      
      <div className="flex flex-row space-x-16">
        <div className="flex flex-col items-center">
          <Textarea

            variant="underlined"
            placeholder="Enter your Message"
            className="max-w-xs bg-transparent"
            value={messageText}  
            onChange={handleChange}
          />
          <Spacer x={4} />
          <Button size='sm' onClick={publicFromClientHandler}>Send</Button>
        </div>
        <Spacer x={4} />

      <ScrollShadow className="max-w-5xl min-w-[200px] max-h-[200px]">
        <Listbox
          emptyContent={`No messages.`}
          variant="solid"
          items={logs}
          aria-label="Dynamic Actions"
          onAction={(key) => alert(key)}
          title='MESSAGES'
        >
          {
          (item) => (
            <ListboxItem
              
              key={item.message+item.timemili}
              color={"default"} 
              className={""}
            >
              <p className="text-xs text-green-600">{item.timestamp} {item.id}</p>{item.message}
            </ListboxItem>
          )}
        </Listbox>
      </ScrollShadow>
      </div>
    </div>

    
  )
}

export default Authenticated;