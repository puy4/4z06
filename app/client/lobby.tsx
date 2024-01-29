'use client';
import Ably from 'ably';
import { useAbly } from "ably/react"
import {Button, Listbox, ListboxItem, ScrollShadow} from "@nextui-org/react";
import React,{ useState, useEffect, Dispatch, SetStateAction  } from 'react';
import { NextPage } from 'next';

interface LobbyProps {
  onEnterRoom:(channelName: string)=> void;
  playersReady:boolean;
  onStartGame(): void;
  setPlayersReady:(b:boolean) => void;
  setSymbol:(s:string) => void;
}

interface GameRoom {
  name: string
  owner:string;
  roomChannelName: string;
}

const Lobby: NextPage<LobbyProps>= ({setSymbol,setPlayersReady,playersReady,onEnterRoom,onStartGame }) => {

  const [gameRooms, setGameRooms] = useState<GameRoom[]>([]);
  const [isRoomCreator, setIsRoomCreator] = useState(false); 

  const ably = useAbly();
  const lobbyChannel = ably.channels.get('tictactoe:lobby');
  
  useEffect(() => {
    lobbyChannel.presence.subscribe(() => {
      lobbyChannel.presence.get()
      .then(presenceData => {
        console.log("Presence Data:", presenceData[0].clientId);
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
    setIsRoomCreator(true);
    setSymbol('X');
    lobbyChannel.presence.enter();
    const newChannelName = `tictactoe:${ably.auth.clientId}s-game`;
    const gameChannel = ably.channels.get(newChannelName);
    gameChannel.subscribe('enter', function(message) {
      onEnterRoom(newChannelName);
      setPlayersReady(true);
    });
  }
  
  const handleEnterRoom = (channelName:string) => {  
    setSymbol('O');
    ably.channels.get(channelName).publish("enter","enter");
    onEnterRoom(channelName);
    setPlayersReady(true);
  }

  return (    
    <div className="flex items-center flex-col flex-row">
      <h1 className={`mb-4 text-xl md:text-2xl`}>
          Lobby 
      </h1>
      (Enter or create a room)
      <ScrollShadow className="max-w-5xl min-w-[200px] max-h-[200px]">
        <Listbox
          emptyContent={`No Available Rooms.`}
          variant="light"
          items={gameRooms}
          aria-label="Dynamic Actions"
          title='Game Rooms'
          disabledKeys={[]}
        >
          {
          (item) => (
            <ListboxItem
              key={item.name}
              color={"default"} 
              className={""}
            >
              {item.name} - Awaiting Opponent
              <Button size='sm' isDisabled={isRoomCreator?true:false} onPress={() => handleEnterRoom(item.roomChannelName)}>
                  Enter
            </Button>
            </ListboxItem>
          )}
        </Listbox>
      </ScrollShadow>

      {isRoomCreator?
      (playersReady?
      (<h3 className="text-red-600">A player has joined your room, click 'Start' to start the game</h3>):
      (<h3 className="text-red-600">Room Created, Awaiting Opponent</h3>)):(
      playersReady?
      (<h3 className="text-red-600">Room joined, click 'Start' to start the game</h3>):(null))}
      <div  className="space-x-16">
      <Button size="sm" isDisabled={isRoomCreator?true:false}  onClick={() => handleCreateRoom()}>Create A Room</Button>
      <Button size="sm" isDisabled={playersReady?false:true} onClick={() => onStartGame()}>Start</Button>
      </div>
    </div>)
  }

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
  
export default Lobby
