'use client';
import type { NextPage } from 'next';
import Ably from 'ably';
import {Button, ButtonGroup} from "@nextui-org/react";
import { lusitana } from '@/app/ui/fonts';
import React,{ useState, useContext, useEffect  } from 'react';

import { AblyProvider, useAbly, usePresence } from "ably/react"


import Logger,{LogEntry} from '../components/logger';




function Lobby(){

  const [members, setMembers] = useState<Array<Ably.Types.PresenceMessage>>([]);
  


  const client = new Ably.Rest({ key: 'Hi8h7g.DZi1fQ:C4aCqN_ORbwsRXVWzq8qEDGpHDRD7vbfwI0reJsX4S4' });
  const lobby = client.channels.get('tictactoe:lobby');
  
  useEffect(() => {
    const client = new Ably.Rest({ key: 'Hi8h7g.DZi1fQ:C4aCqN_ORbwsRXVWzq8qEDGpHDRD7vbfwI0reJsX4S4' });
    const lobby = client.channels.get('tictactoe:lobby');

    const fetchData = () => {
      lobby.presence.get((err, resultPage) => {
        if (!err && resultPage) {
          const membersData = resultPage.items;
          setMembers(membersData);
          console.log(membersData[0]?.clientId);
          // Process the presence data as needed
        } else {
          console.error('Error fetching presence information:', err);
        }
      });
    };

    fetchData();

    // Cleanup function (optional): Unsubscribe or clean up resources when the component unmounts
    return () => {
      // Unsubscribe or clean up as needed
    };
  }, []); // The empty dependency array ensures this effect runs only on mount
  
    

    // In the lobby, we use presence only for players who have hosted a game and
    // are waiting for an opponent to join. When an opponent joins a game, the
    // host will leave the lobby
    return (     
      <>
        <ul>
          {members.map((presence:Ably.Types.PresenceMessage) => (
            <li key={presence.clientId}>{presence.clientId}</li>
          ))}
        </ul>
      </>

      )
  }


export default Lobby

