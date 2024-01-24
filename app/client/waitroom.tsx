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
      
        <Logger logEntries={data} displayHeader={false} />    
      
        

      </AblyProvider>
    );
  }

function EnterLobby(){

    const client = new Ably.Realtime({ key:'Hi8h7g.DZi1fQ:C4aCqN_ORbwsRXVWzq8qEDGpHDRD7vbfwI0reJsX4S4'});

    const lobby = client.channels.get('tictactoe:lobby');
    lobby.presence.subscribe('enter', function(member) {
      console.log(member.clientId); // => not moving
    });




  
    // In the lobby, we use presence only for players who have hosted a game and
    // are waiting for an opponent to join. When an opponent joins a game, the
    // host will leave the lobby.



    return (     
      <>
      

      </>

      )
  }


export default WaitRoom

