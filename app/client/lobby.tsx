'use client';
import type { NextPage } from 'next';
import Ably from 'ably';
import {Button, ButtonGroup} from "@nextui-org/react";
import { lusitana } from '@/app/ui/fonts';
import React,{ useState, useContext  } from 'react';

import { AblyProvider, useAbly, usePresence } from "ably/react"


import Logger,{LogEntry} from '../components/logger';



function Lobby(){


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


export default Lobby

