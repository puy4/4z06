"use client"
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Board } from '../ui/Board';
import { WinnerModal } from '../ui/WinnerModal';
import { useAbly } from "ably/react"
import Ably from "ably"
import { useDisclosure } from '@nextui-org/react';

interface TicTacToeProps {
  gameChannelName: string | null;
  symbol:string;
}

class GameData {
  id: string;
  type: string;
  data: string;

  constructor(id: string,type: string, data: string) {
    this.id = id;
    this.type = type;
    this.data = data;
  }
}

const TicTacToe: NextPage<TicTacToeProps> = ({ symbol,gameChannelName }) => {

  const ably=useAbly();
  const [playerSymbol, setPlayerSymbol] = useState<string>('');
  const [newGame, setNewGame] = useState<boolean>(false);
  const [squares, setSquares] = useState<Array<any>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string|null>(null);
  const [gameChannel, setGameChannel] = useState<Ably.Types.RealtimeChannelPromise | null>(null);

  useEffect(() => {

    if (gameChannelName) {
      const gameChannel = ably.channels.get(gameChannelName);    
      setGameChannel(gameChannel);};

    const onMove = (message:Ably.Types.Message) => {
      console.log("-------------")
      console.log(currentPlayer, "made a move")
      setSquares(message.data.squares);
      setCurrentPlayer(message.data.nextPlayer);
      console.log(currentPlayer, "is Next")
      console.log("-------------")
    };

    gameChannel?.subscribe('move',onMove);

    if (!currentPlayer) {
      const firstPlayer = Math.random() < 0.5 ? 'X' : 'O';
      console.log(firstPlayer," goes first")
      setCurrentPlayer(firstPlayer);
      handleNewGame();
      gameChannel?.publish('move', { squares, nextPlayer: firstPlayer });
    }

    return () => {
      gameChannel?.unsubscribe('move',onMove);
    };
  }, [gameChannelName, currentPlayer]);
  
  let winner = calculateWinner(squares);

  const handlePlayerMove = (index:number) => {
    if (squares[index] || currentPlayer !== playerSymbol) return; // Example condition: only 'X' can play
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    gameChannel?.publish('move', { squares: newSquares, nextPlayer });
  };

  function handleRestartGame() {
    setSquares(Array(9).fill(null));
    setCurrentPlayer(null);
  }

  function handleNewGame() {
    setPlayerSymbol(symbol);
    setSquares(Array(9).fill(null));
    setNewGame(true);
  };

  function handleQuitGame() {
    setPlayerSymbol('');
    setSquares(Array(9).fill(null));
    setNewGame(false);
  }

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
    <div className="flex flex-col items-center py-2">

      
      <h1 className="text-4xl md:text-6xl  mt-4">
        Tic
        {" "}
        <span className="">Tac </span>
        {" "}
        Toe
      </h1>
      
      <p>*Game may not start properly, use the restart button at the top to restart the game</p>

      <Board
        winner={winner}
        playerSymbol={playerSymbol}
        currentPlayer={currentPlayer}
        squares={squares}
        handlePlayerMove={handlePlayerMove}
        handleRestartGame={handleRestartGame}
      />

      {winner && 
        <WinnerModal
          handleRestartGame={handleRestartGame}
          winner={winner}
          handleQuitGame={handleQuitGame}
          handleNewGame={handleNewGame}
        />
      }
    </div>
  )
}

export default TicTacToe