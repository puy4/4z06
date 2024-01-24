'use client';
import type { NextPage } from 'next';
import {
  NoSymbolIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import React,{ useState } from 'react';
import { usePresence } from "ably/react"
import Logger,{LogEntry} from '../components/logger';
import * as Ably from 'ably'
import {Button, ButtonGroup} from "@nextui-org/react";
import WaitRoom from './waitroom';
const Dashboard: NextPage = () => {

  const [Game, setGame] = useState("");

  const iconMap = {
    available: PlayIcon,
    unavailable: NoSymbolIcon,
  };
  function Card({
    title,
    value,
    type,
    game,
  }: {
    title: string;
    value: number | string;
    type: 'available' | 'unavailable';
    game: string
  }) {
    const Icon = iconMap[type];
    
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
       <button onClick={() => setGame(game)} className="flex p-4 bg-blue-600 text-white hover:bg-blue-700" > 
          {Icon ? <Icon  className="h-5 w-5 " /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </button>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center`}
        >
          {value}
        </p>
      </div>
    );
  }
  
  function Choose(){
    
    return (
      <div>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
              Games
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              
                <Card title="ttt"  value= "Tic-Tac-Toe" type="available" game="tictactoe" />
                <Card title="Duodecimal Cribbage"  value= "Duodecimal Cribbage" type="unavailable" game="" />

            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
              {}
            </div>  
      </div>)
  };


  return (
    <div>
    {Game=="" && <><Choose/></>}
    {Game=="tictactoe"&& <><WaitRoom/><Button color="danger" onPress={()=>setGame("")}>Back</Button></>}

    
    </div>
  );
}


export default Dashboard

