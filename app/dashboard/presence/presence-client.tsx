'use client'
import React from "react";
import * as Ably from 'ably';
import { AblyProvider, useAbly, usePresence } from "ably/react"
import { useState, ReactElement, FC } from 'react'
import Logger, { LogEntry } from '../../../components/logger';


export default function Presence() {




  const client = new Ably.Realtime.Promise ({ authUrl:'/token', authMethod: 'POST'} );


  return (
     <AblyProvider client={ client }>
      <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-start items-start gap-10">
        <div className=" text-base max-w-screen-sm">
          Ably presence testing
          </div>

          <PresenceMessages/>

        </div>
      </div>
    </AblyProvider>   
  )
}

const PresenceMessages: FC<any> = (): ReactElement => {
  
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const client = useAbly();

  const { presenceData, updateStatus } = usePresence("room", {'status':'available'}, (member) => {
    setLogs(prev => [...prev, new LogEntry(`action: ${member.action} clientId: ${member.clientId}`)])
  });

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-[752px]">
        <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border bg-white min-w-[752px]">
          <div className="font-jetbrains-mono text-sm min-w-[227px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium">
            <ul>
            {presenceData.map((member) => {
              return (<li className="font-jetbrains-mono text-sm min-w-[133px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium" key={member.id}>{member.clientId}</li>)
            })}
          </ul>
          </div>
        </div>
        
      </div>
      <Logger logEntries={logs} displayHeader={true} />
    </>
  )
}