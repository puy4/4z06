"use client"

import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Board } from '../../ui/Board';
import { ChoosePlayer } from '../../ui/ChoosePlayer';
import { WinnerModal } from '../../ui/WinnerModal';

const Page: NextPage = () => {
  const [isX, setIsX] = useState<boolean>(true);
  const [newGame, setNewGame] = useState<boolean>(false);
  const [squares, setSqaures] = useState<Array<any>>(Array(9).fill(null));

  let winner = calculateWinner(squares);

  // handle Choose player
  function handlePlayerX() {
    setIsX(true);
  }

  function handlePlayerO() {
    setIsX(false);

  }

    //// It will Handle which Icon will apppear on Board on cliking  one the Squares
  function handlePlayer(i: number) {

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
  
      squares[i] = isX ? "X" : "O";
      setSqaures(squares);
      setIsX(!isX);
    }

  function handleRestartGame() {
    setIsX(true);
    setSqaures(Array(9).fill(null));
  }


  // It will handle the start Game when the player choose one of the Icon
  // with which they want to player
  function handleNewGame() {
    setIsX(true);
    setSqaures(Array(9).fill(null));
    setNewGame(true);
  };

  function handleQuitGame() {
    setIsX(true);
    setSqaures(Array(9).fill(null));
    setNewGame(false);
  }
  // Calculate the winner
  function calculateWinner(squares: Array<any>) {
    // Total 8 winning patterens
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-white flex-col items-center  py-2">


      <h1 className="text-4xl md:text-6xl font-extrabold mt-4 text-blue-600 ">
        Tic
        {" "}
        <span className="text-black">Tac </span>
        {" "}
        Toe
      </h1>

      {!newGame
        ?
        <ChoosePlayer
          handleNewGame={handleNewGame}
          handlePlayerX={handlePlayerX}
          handlePlayerO={handlePlayerO}
        />
        :
        <Board
          winner={winner}
          playerX={isX}
          squares={squares}
          handlePlayer={handlePlayer}
          handleRestartGame={handleRestartGame}
        />
      }
      {winner && 
      <WinnerModal
          winner={winner}
          handleQuitGame={handleQuitGame}
          handleNewGame={handleNewGame}
        />
      }
    </div>
  )
}

export default Page