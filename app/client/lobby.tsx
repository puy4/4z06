'use client';
import Ably from 'ably';
import {Button} from "@nextui-org/react";
import { lusitana } from '@/app/ui/fonts';
import React,{ useState, useEffect  } from 'react';
import {Divider} from "@nextui-org/react";

import TicTacToe from './tictactoe';




function Lobby(){

  const [members, setMembers] = useState<Array<Ably.Types.PresenceMessage>>([]);
  const [entered, setEntered] = useState(false);

  const client = new Ably.Rest({ key: 'Hi8h7g.DZi1fQ:C4aCqN_ORbwsRXVWzq8qEDGpHDRD7vbfwI0reJsX4S4' });
  const lobby = client.channels.get('tictactoe:lobby');
  const handleEnterGame = () => {
    setEntered(true)
  };

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
  
  useEffect(() => {


    fetchData();

    // Cleanup function (optional): Unsubscribe or clean up resources when the component unmounts
    return () => {
      // Unsubscribe or clean up as needed
    };
  }, []); // The empty dependency array ensures this effect runs only on mount
  const handleReload = () => {
    fetchData(); // Manually fetch data when the button is clicked
  };



    // In the lobby, we use presence only for players who have hosted a game and
    // are waiting for an opponent to join. When an opponent joins a game, the
    // host will leave the lobby
    return (    
      entered?(<TicTacToe/>):(
      <>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Lobby 
        </h1>
        <div className="flex flex-col justify-start items-start rounded-lg bg-white">
        <div className="text-rose-400">(Click on a player ID to start)</div>
        <div className="flex flex-col-reverse justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 w-[752px] max-h-60 overflow-y overflow-x-scroll scrollbar ">
        <div className="font-jetbrains-mono text-sm  text-rose-400 text-opacity-100 leading-normal font-medium">
        <ul>
          {
          members.map((presence:Ably.Types.PresenceMessage) => (
            <li key={presence.id}><Button size="sm" variant="ghost" onClick={handleEnterGame}>{presence.clientId}</Button></li>

          ))
          }
        </ul>
        </div>
        </div>
        </div>
        <Button  onClick={handleReload}>Refresh</Button>
        <div>
        <Divider className="my-4" />
        </div>
      </>)


      )
  }


export default Lobby

