'use client';
import type { NextPage } from 'next';
import Ably from 'ably';
import {Button, ButtonGroup} from "@nextui-org/react";
import { lusitana } from '@/app/ui/fonts';
import React,{ useState, useContext  } from 'react';

import { AblyProvider, useAbly, usePresence } from "ably/react"


import Logger,{LogEntry} from '../components/logger';


const WaitRoom: NextPage = () => {


  const c = useAbly();
  
  return (
    <AblyProvider client={ c }>

        
        <div className="font-manrope text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">LOBBY</span>
        </div>
      
      <EnterLobby/>
      
        

      </AblyProvider>
    );
  }

  function EnterLobby(){
    const c = useAbly();
    const [logs, setLogs] = useState<Array<LogEntry>>([]);

    const userClientId = (c.auth.clientId);
    
    const lobbyChannel = c.channels.get('tictactoe:lobby');

    lobbyChannel.presence.subscribe(({ action, clientId, data }) => {
      console.log(clientId)
      setLogs(prev => [...prev, new LogEntry(`action: ${action}`,`clientId: ${clientId}`)])
    });
    console.log(logs)


  
    // In the lobby, we use presence only for players who have hosted a game and
    // are waiting for an opponent to join. When an opponent joins a game, the
    // host will leave the lobby.
{/* Hello World 
    const [logs, setLogs] = useState<Array<LogEntry>>([]);
    
    const { presenceData, updateStatus } = usePresence("tictactoe:lobby", {'status':'available'}, (member) => {
      setLogs(prev => [...prev, new LogEntry(`action: ${member.action}`,`clientId: ${member.clientId}`)])
    });
  */}

    return (     
      <>
      <Logger logEntries={logs} displayHeader={false} />  

      </>

      )
  }


export default WaitRoom

