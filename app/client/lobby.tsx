'use client';
import Ably from 'ably';
import { useAbly } from "ably/react"
import {Button} from "@nextui-org/react";
import React,{ useState, useEffect  } from 'react';
import {Divider} from "@nextui-org/react";
import { NextPage } from 'next';

const processPresenceDataToGameRooms = (presenceData: Ably.Types.PresenceMessage[]): GameRoom[] => {
  const gameRoomMap = new Map<string, [string, string]>();
  presenceData.forEach(presenceMessage => {
    const roomName = `${presenceMessage.clientId}'s game`; 
    const owner = presenceMessage.clientId;
    const roomChannelName = `tictactoe:${presenceMessage.clientId}s-game`; 
    gameRoomMap.set(roomName, [owner, roomChannelName]);
    
  });
  
  return Array.from(gameRoomMap, ([name, [owner, roomChannelName]]) => ({ name, owner, roomChannelName}));
};

interface LobbyProps {
  onEnterRoom(channelName: string): void;
  playersReady:boolean;
  onStartGame(): void;
}

interface GameRoom {
  name: string;
  owner:string;
  roomChannelName: string;
}

const Lobby: NextPage<LobbyProps>= ({ playersReady,onEnterRoom,onStartGame }) => {

  const [members, setMembers] = useState<Array<Ably.Types.PresenceMessage>>([]);
  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [isRoomCreator, setIsRoomCreator] = useState(false);
  const ably = useAbly();
  const lobbyChannel = ably.channels.get('tictactoe:lobby');
  
  useEffect(() => {
    
    lobbyChannel.presence.subscribe(() => {
      lobbyChannel.presence.get()
      .then(presenceData => {
        console.log("Presence Data:", presenceData[0].clientId);
        setMembers(presenceData);
        const rooms = processPresenceDataToGameRooms(presenceData);
        setGameRooms(rooms);
        console.log(rooms);
      })
      .catch(err => {
        console.error('Error fetching presence data:', err);
      });
    });

    return () => {
      lobbyChannel.presence.unsubscribe();
      lobbyChannel.presence.leave();
    };
  }, []);



  function handleCreateRoom(){
    lobbyChannel.presence.enter();
    const newChannelName = `tictactoe:${ably.auth.clientId}s-game`;
    const gameChannel = ably.channels.get(newChannelName);
    ably.channels.get(newChannelName).presence.enter();

    setIsRoomCreator(true);
    onEnterRoom(newChannelName);
  }
  

  const handleEnterRoom = (channelName:string) => {  
    ably.channels.get(channelName).presence.enter();
    onEnterRoom(channelName);
  }




  return (    
    <>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
          Lobby 
      </h1>
      (Enter or create a room)
      <div className="flex flex-col justify-start items-start rounded-lg bg-white">
      <div className="flex flex-col-reverse justify-start items-start gap-4 pt-6 pr-6 
      pb-6 pl-6 w-[752px] max-h-60 overflow-y overflow-x-scroll scrollbar ">
      <div className="font-jetbrains-mono text-sm  text-black t
      ext-opacity-100 leading-normal font-medium">
      <ul>
        {
        gameRooms.map((room) => (
          <li key={room.name}>
          {room.name} - Awaiting Opponent
          <Button size="sm" variant="ghost" disabled={isRoomCreator} onPress={() =>  handleEnterRoom(room.roomChannelName)}>
            Enter Room
            </Button></li>)
        )
        }
      </ul>
      </div>
      </div>
      </div>
      {isRoomCreator?(<h3 className="text-red-600">Room Created, Awaiting Opponent</h3>):(null)}
      <Button size="sm" disabled={isRoomCreator} onClick={() => handleCreateRoom()}>Create A Room</Button>
      <Button size="sm" disabled={!playersReady} onClick={() => onStartGame()}>Start Game</Button>

      <div>

      </div>
    </>)
  }
export default Lobby
