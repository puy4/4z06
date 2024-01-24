'use client';
import type { NextPage } from 'next';
import Ably from 'ably';
import {Button, ButtonGroup} from "@nextui-org/react";
import { lusitana } from '@/app/ui/fonts';
import React,{ useState, useContext  } from 'react';

import { AblyProvider, useAbly, usePresence } from "ably/react"
import Lobby from './lobby';
 
import Logger,{LogEntry} from '../components/logger';


const WaitRoom: NextPage = () => {


  const c = useAbly();
  const lobbyChannel = c.channels.get('tictactoe:lobby');

  const [data, setData] = useState<Array<LogEntry>>([]);
    
  const { presenceData, updateStatus } = usePresence("tictactoe:lobby", {'status':'available'}, (member) => {
    setData(prev => [...prev, new LogEntry(`action: ${member.action}`,`clientId: ${member.clientId}`)])
  });

  return (
    <AblyProvider client={ c }>

        
        <div className="font-manrope text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">LOBBY</span>
        </div>
        
        <Lobby/>
        <Logger logEntries={data} displayHeader={false} />    
      
        

      </AblyProvider>
    );
  }



export default WaitRoom

