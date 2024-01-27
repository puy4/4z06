'use client';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import {useAbly} from "ably/react"
import Lobby from './lobby';
import TicTacToe from './tictactoe';



const WaitRoom: NextPage = () => {
  const [gameState, setGameState] = useState('lobby'); // 'lobby' or 'game'
  const [gameChannelName, setGameChannelName] = useState<string|null>(null); // The channel of the game the player joined
  const ably = useAbly();
  const [occupancy, setOccupancy] = useState<number>()
  const [playersReady, setPlayersReady] = useState(false); 

  const channel = gameChannelName?ably.channels.get(gameChannelName):null;

  useEffect(() => {

    if(gameChannelName)
    {
      const channel = ably.channels.get(gameChannelName);
      channel.setOptions({ params: { occupancy: 'metrics.presenceConnections' } }).then(() => {});
      channel.subscribe('[meta]occupancy', (message) => {
        setOccupancy(Number(message.data.metrics.presenceConnections))
      });
    };   
    // Cleanup function for useEffect (optional)
    return () => {
      if(channel){
        channel.unsubscribe();
      }
    };
  }, [gameChannelName,playersReady,occupancy]); 


  const onEnterRoom = (channelName:string) => {

    setGameChannelName(channelName);
    if (occupancy==2){
      setPlayersReady(true);
    }

  };

  const onStartGame = () => {
    setGameState("game");
  };

  return (
    gameState === 'lobby' ? 
      <Lobby onEnterRoom={onEnterRoom}  playersReady={playersReady}  onStartGame ={onStartGame}/> : 
      <TicTacToe gameChannelName={gameChannelName} />

  );

    
  }



export default WaitRoom

