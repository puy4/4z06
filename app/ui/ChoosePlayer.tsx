"use client"

import React, { useState } from 'react'
import { OIcon } from './OIcon'
import { XIcon } from './XIcon'
import { useAbly, useChannel} from "ably/react"


interface PlayerProp {
  handleNewGame(): void,
  handlePlayerX(): void,
  handlePlayerO(): void,

}


export const ChoosePlayer = ({ handlePlayerX,handlePlayerO,handleNewGame}: PlayerProp) => {

  const client = useAbly();
  const gameChannel = client.channels.get('tictactoe:game');

  function  handleChooseX(): void {
    if(gameChannel === null) return
    gameChannel.publish('choice', 'X');
    handlePlayerX();
  }

  function  handleChooseO(): void {
      if(gameChannel === null) return;
      gameChannel.publish('choice', 'O');
      handlePlayerO();
    }


  return (
    <div className="mt-20 md:mt-16 w-[500px] flex flex-col items-center justofy-center mx-auto">
      <div className="flex rounded-xl px-6 py-2 items-center justify-center space-x-4">

      </div>
      <div className="flex flex-col bg-white items-center py-8 w-[400px] md:w-[500px] h-64 md:h-72 rounded-2xl mt-6 space-y-6 md:space-y-8">
        <p className="text-md text-black uppercase  md:text-xl ">
          Please Select 
          {"  "}
          <span className="text-black text-xl font-bold ">X</span> 
          {"  "}
          or 
          {"  "}
          <span className="text-black text-xl font-bold">O</span>
        </p>        <p className="text-md text-black uppercase  md:text-s "> (X goes first)</p>
        <div className="w-3/4 bg-blue-600  flex items-center justify-evenly h-24 rounded-2xl p-6 ">
          <button onClick={handleChooseX} className="focus:bg-blue-400 hover:bg-blue-400 trasnsition duartion-300 ease-in flex items-center justify-center rounded-xl px-6 py-2 ">
            <XIcon />
          </button>
          <button onClick={handleChooseO} className="focus:bg-blue-400 hover:bg-blue-400 trasnsition duartion-300 ease-in flex items-center justify-center rounded-xl px-6 py-2 " >
            <OIcon />
          </button>
        </div>

      </div>
      <button onClick={handleNewGame} className="button hover:bg-blue-400 rounded-xl mt-8 px-6 py-3 bg-blue-600 ">
      <p className="text-md text-white uppercase"> Start Game </p>  
      </button>
    </div>
  )
}