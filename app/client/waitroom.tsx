'use client';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import Lobby from './lobby';
import TicTacToe from './tictactoe';
interface WaitRoomProps {
  gameSelected: string;

}
const WaitRoom: NextPage<WaitRoomProps> = ({gameSelected}) => {

  const [gameState, setGameState] = useState('lobby'); // 'lobby' or 'game'
  const [gameChannelName, setGameChannelName] = useState<string|null>(null); // The channel of the game the player joined
  const [playersReady, setPlayersReady] = useState(false); 
  const [symbol, setSymbol] = useState(''); 

  const onEnterRoom = (channelName:string) => {
    setGameChannelName(channelName);
  };
  
  const onStartGame = () => {
      setGameState("game");
  };
  
  return (
    gameState === 'lobby' ? 
      (<Lobby setSymbol={setSymbol} onEnterRoom={onEnterRoom}  setPlayersReady={setPlayersReady} playersReady={playersReady}  onStartGame ={onStartGame}/>) : 
      (<TicTacToe symbol={symbol} gameChannelName={gameChannelName}/>)
  );

  }



export default WaitRoom

