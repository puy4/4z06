'use client';
import {Card, CardHeader, CardBody, CardFooter, Divider, ScrollShadow, User} from "@nextui-org/react";
import type { NextPage } from 'next';
import {
  PlayIcon
} from '@heroicons/react/24/outline';

import React,{ useState } from 'react';

import WaitRoom from './waitroom';
import Image from 'next/image';
import {Button} from "@nextui-org/react";

const Dashboard: NextPage = () => {

  const [Game, setGame] = useState("");


  
  function Choose(){
    
    return (
      <div className={`flex items-center flex-col flex-row`}>

      <h1 className={`mb-4 text-xl md:text-2xl`}>
          Games 
      </h1>
      

          <ScrollShadow orientation="horizontal" className="max-w-[500px] flex flex-row space-x-16">
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

            </ScrollShadow>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
              {}
            </div>  
      </div>)
  };


  return (
    <div> 
    {Game=="" && <Choose/>}
    {Game=="tictactoe"&& <><WaitRoom/>
    <div className="flex justify-center">
            <div className="">
    <Button size="sm" color="danger" onPress={()=>setGame("")}>Back to game selection</Button>
    </div>
    </div>
    </>}
    </div>
  );
}


export default Dashboard

