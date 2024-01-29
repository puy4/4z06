'use client';
import { Link, ScrollShadow, User } from "@nextui-org/react";
import type { NextPage } from 'next';
import {
  PlayIcon
} from '@heroicons/react/24/outline';

import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
            <Box sx={{ minWidth: 275 }}>
              <CardContent>
                <p className=" text-4xl ">
                    Tic-Toc-Toe
                  </p>
                  <Link onPress={()=>(null)} >
                    <p className=" text-sm font-bold  text-zinc-600 dark:text-zinc-300">
                    rules
                    </p>
                  </Link >

              </CardContent>
              <CardActions>
                <Button size="sm"  onClick={() => setGame("tictactoe")} className="" > 
                <PlayIcon height={15}/>
                PLAY NOW</Button>
              </CardActions>
            </Box>

            <Box sx={{ minWidth: 275 }}>
              <CardContent>
                  <p className=" text-4xl ">
                    Cribbage
                  </p>
                  <Link onPress={()=>(null)}>
                    <p className=" text-sm font-bold  text-zinc-600 dark:text-zinc-300">
                    rules
                    </p>
                  </Link >
              </CardContent>
              <CardActions>
                <Button size="sm"  onClick={() => setGame("tictactoe")} className="" > 
                <PlayIcon height={15}/>
                PLAY NOW</Button>
              </CardActions>
            </Box>

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

