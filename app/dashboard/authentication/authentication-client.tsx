
'use client'
import React from 'react'
import { MouseEventHandler, MouseEvent, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import * as Ably from 'ably'
import Logger, { LogEntry } from '../../../components/logger'

import { AblyProvider, useAbly, useConnectionStateListener } from 'ably/react'

export default function Authentication() {
  const { user, isLoading } = useUser();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const client = new Ably.Realtime.Promise ({ authUrl: '../../token', authMethod: 'POST', recover: (_, cb) => { cb(true); } });

  return (
    <AblyProvider client={ client }>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-start items-start gap-10">

          <div className="font-manrope text-base max-w-screen-sm  leading-6 font-light" >
            Test ably authentication function
          </div>
          <ConnectionStatus />
        </div>
      </div>
    </AblyProvider>   
  )
}

const ConnectionStatus = () => {
  
  const ably = useAbly();
  
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const [connectionState, setConnectionState] = useState('unknown')

  useConnectionStateListener((stateChange) => {
    setConnectionState(stateChange.current)
    setLogs(prev => [...prev, new LogEntry(`Connection state change: ${stateChange.previous} -> ${stateChange.current}`)])
  })
  
  const connectionToggle: MouseEventHandler =  (_event: MouseEvent<HTMLButtonElement>) => {
    if(connectionState === 'connected') {
      ably.connection.close()
    }
    else if(connectionState === 'closed') {
      ably.connection.connect()
    }
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-[752px] h-[124px]">
        <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg bg-grey-100 border-t border-b border-l border-r border-solid border h-[68px] min-w-[752px]">
          <div className="font-jetbrains-mono text-sm min-w-[227px] whitespace-nowrap text-black text-opacity-100 leading-normal font-medium">
            connection status
            <span className="text-black text-opacity-100">&nbsp;</span>
            =&nbsp;
            <span className="text-green-800 text-opacity-100">
              {connectionState}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-md w-[120px] h-10 bg-blue-600">
          <div className="font-manrope text-base min-w-[80px] whitespace-nowrap text-white text-opacity-100 text-center leading-4 font-medium">
            <button onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
          </div>
        </div>
      </div>
      <Logger logEntries={logs} displayHeader={true} />
    </>
  )
}