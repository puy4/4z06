'use client';
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import type { NextPage } from 'next';
import {
  PlayIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import React,{ useState } from 'react';

import WaitRoom from './waitroom';
import Image from 'next/image';
import {Button} from "@nextui-org/react";
import Logo from "../ui/logo";
const Dashboard: NextPage = () => {

  const [Game, setGame] = useState("");


  
  function Choose(){
    
    return (
      <div>
      <h1 className={`${lusitana.className} mb-4text-xl md:text-2xl`}>
              Games
            </h1>
            <div className="flex flex-row space-x-4">
            <Card className="max-w-[100px]">
              <CardHeader className="flex gap-3">
                <Image
                  src="/tic2.svg" 
                  alt=""
                  width={25} 
                  height={25} 
                />
                <div className="flex flex-col">
                  <p className="text-md">Tic Toc Toe</p>
                  <p className="text-small text-default-500"></p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>Fun</p>
              </CardBody>
              <Divider/>
              <CardFooter>
               <Button size="sm" onClick={() => setGame("tictactoe")} className="" ><PlayIcon height={20}/> play now</Button>

              </CardFooter>

              </Card>
              <Card className="max-w-[100px]">
              <CardHeader className="flex gap-3">
                <Image
                  src="/poker.svg" 
                  alt=""
                  width={25} 
                  height={25} 
                />
                <div className="flex ">
                  <p className="text-md"> Crib </p>
                  <p className="text-small text-default-500"></p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>Fun</p>
              </CardBody>
              <Divider/>
              <CardFooter>
               <Button size="sm" onClick={() => setGame("tictactoe")} className="" ><PlayIcon height={20}/> play now</Button>
              </CardFooter>
              </Card>
              </div>

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
    <Button color="danger" onPress={()=>setGame("")}>Back to game selection</Button>
    </div>
    </div>
    </>}

    
    </div>
  );
}


export default Dashboard

