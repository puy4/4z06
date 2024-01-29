'use client';
import { ScrollShadow, User } from "@nextui-org/react";
import type { NextPage } from 'next';
import {
  PlayIcon
} from '@heroicons/react/24/outline';

import React,{ useState } from 'react';

import WaitRoom from './waitroom';

import {Button} from "@nextui-org/react";

interface DashboardProps {
  setGame: React.Dispatch<React.SetStateAction<string>>
  gameSelected:string
}

const Dashboard: NextPage<DashboardProps> = ({gameSelected,setGame}) => {

  
  function Choose(){
    
    return (
      <div className={`flex items-center flex-col flex-row`}>

      <h1 className={`mb-4 text-xl md:text-2xl`}>
          Games 
      </h1>
      

          <ScrollShadow orientation="horizontal" className="md:max-w-[500px] max-w-[300px] flex flex-row space-x-16">
          <User   
            name="Tic-Toc-Toe"
            description={(
            <Button size="sm" onClick={() => setGame("tictactoe")} className="" >
              <PlayIcon height={15}/> PLAY NOW
            </Button>)}
            avatarProps={{
              src: "/tic.svg"
            }}
          />
          <User   
            name="Cribbage"
            description={(
            <Button size="sm" onClick={() => setGame("cribbage")} className="" >
              <PlayIcon height={20}/> PLAY NOW
            </Button>)}
            avatarProps={{
              src: "/tic.svg"
            }}
          />
                    <User   
            name="Tic-Toc-Toe offline"
            description={(
            <Button size="sm" onClick={() => setGame("cribbage")} className="" >
              <PlayIcon height={20}/> PLAY NOW
            </Button>)}
            avatarProps={{
              src: "/tic.svg"
            }}
          />

            </ScrollShadow>
      </div>)
  };


  return (
    <div> 
    {gameSelected=="" && <Choose/>}
    {gameSelected=="tictactoe"&& <><WaitRoom/>
    <div className="flex justify-center">
            <div className="">

    </div>
    </div>
    </>}
    </div>
  );
}


export default Dashboard

