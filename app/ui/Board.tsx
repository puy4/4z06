"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { FaX } from "react-icons/fa6";
import { FaO } from "react-icons/fa6";

interface PlayerProp {
  winner:string,
  playerSymbol: string,
  squares: Array<any>,
  handlePlayerMove(i: number): void,
  currentPlayer:string|null
  handleRestartGame(): void,
}

interface SquareProp {
  value: JSX.Element | string | null,
  onClick(): void,
}

export const Board = ({ winner, playerSymbol, currentPlayer, handlePlayerMove, handleRestartGame, squares }: PlayerProp) => {
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    (winner && playerSymbol !== currentPlayer) ? setDisable(true) : setDisable(false);
    }, [winner, currentPlayer]);

    function Square({ value, onClick}: SquareProp) {
      return (
        <Button size='lg'className="square" onClick={onClick} disabled={disable} >
          {value}
        </Button>
      )
  }

  function value(i:number){
     let squarevalue;
     if( squares[i] ==="X"){
      squarevalue=<FaX />
     }else if( squares[i] === "O"){
      squarevalue=<FaO />
     }else{
      squarevalue=null;
     }
     return squarevalue;
  }

  const renderSquare = (i: number) => {
    return <Square value={value(i)} onClick={() => handlePlayerMove(i)} />
  }

  return (
    <div>
      <div className="w-full flex flex-row items-center justify-between">
          {
          playerSymbol=='X'
            ?
            <div className="w-full text-xl rounded-lg font-medium uppercase  center-left">
              You are 
              {" "}
              <span className=" text-2xl  font-bold">
                X
              </span>
            </div>
            :
            <div className="w-full text-xl rounded-lg font-medium  uppercase center-left">
              You are 
              {" "}
              <span className=" text-2xl  font-bold">
                O
              </span>
            </div>
          }
        <Button size={'sm'} variant='light' onClick={handleRestartGame} className="px-2 py-1" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition duration-300 eas-in  " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>
      <div className="board flex flex-col  space-y-2">
        <div className="board-row flex flex-row space-x-2 ">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row flex flex-row space-x-2 ">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row flex flex-row space-x-2 ">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}