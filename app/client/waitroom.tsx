'use client';
import type { NextPage } from 'next';

import React from 'react';

import { AblyProvider, useAbly} from "ably/react"
import Lobby from './lobby';
 



const WaitRoom: NextPage = () => {


  const c = useAbly();
  const lobbyChannel = c.channels.get('tictactoe:lobby');
  lobbyChannel.presence.enter();



    


  return (
    <AblyProvider client={ c }>
        
        <Lobby/>
 
      
        

      </AblyProvider>
    );
  }



export default WaitRoom

