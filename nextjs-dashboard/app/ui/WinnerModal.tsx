import React from 'react'
import { OIcon } from './OIcon';
import { XIcon } from './XIcon'

interface GameProps{
  winner:string
  handleQuitGame():void;
  handleNewGame():void;
}

export const WinnerModal = ({winner ,handleQuitGame , handleNewGame} :GameProps) => {
  return (
    <div className="bg-gray-100/60 z-10 min-h-screen w-full absolute top-0 left-0">
      <div className="w-[500px] h-[250px] rounded-xl bg-blue-600 space-y-10 px-6 py-4 mx-auto mt-52 flex items-center justify-center flex-col">
       <h2 className="flex flex-col items-center justify-center space-y-6 text-2xl md:text-4xl font-bold">
         {winner === "X" ? <XIcon /> : <OIcon />}
         <p className="uppercase text-white">Wins</p>
       </h2>

      <div className="flex items-center justify-center space-x-16">
        <button onClick={handleQuitGame} className="button px-4 rounded-md py-1 bg-blue-600 hover:bg-white">OK</button>

      </div>
      </div>
    </div>
  )
}