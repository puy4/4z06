"use client"
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Board } from '../ui/Board';
import { WinnerModal } from '../ui/WinnerModal';
import { useAbly } from "ably/react"
import Ably from "ably"

interface TicTacToeProps {
  gameChannelName: string | null;
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

const TicTacToe: NextPage<TicTacToeProps> = ({gameChannelName} ) => {
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
      if (message.name === 'move') {
        setSquares(message.data.squares);
        setCurrentPlayer(message.data.nextPlayer);
      }
    };
    gameChannel?.subscribe('move',onMove);

    if (!currentPlayer) {
      const firstPlayer = Math.random() < 0.5 ? 'X' : 'O';
      setCurrentPlayer(firstPlayer);
      gameChannel?.publish('move', { squares, nextPlayer: firstPlayer });
    }

    return () => {
      gameChannel?.unsubscribe('move',onMove);
    };
  }, [gameChannelName, currentPlayer]);
  

  let winner = calculateWinner(squares);
  // handle Choose player
  function handlePlayerX() {
    setPlayerSymbol('X');
  }

  function handlePlayerO() {
    setPlayerSymbol('O');

  }

    //// It will Handle which Icon will apppear on Board on cliking  on the Squares
  function handlePlayer(i: number) {

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
  
      squares[i] = playerSymbol=='X' ? "X" : "O";
      setSquares(squares);
      if(playerSymbol=='X'){setPlayerSymbol('O');}
      else{setPlayerSymbol('X');}
    }

  function handleRestartGame() {
    setSquares(Array(9).fill(null));
  }
  
  const handlePlayerMove = (index:number) => {
    if (squares[index] || currentPlayer !== ably.auth.clientId) return; // Example condition: only 'X' can play
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    gameChannel?.publish('move', { squares: newSquares, nextPlayer });
  };



  // It will handle the start Game when the player choose one of the Icon
  // with which they want to player
  function handleNewGame() {
    setPlayerSymbol('X');
    setSquares(Array(9).fill(null));
    setNewGame(true);
  };

  function handleQuitGame() {
    setPlayerSymbol('');
    setSquares(Array(9).fill(null));
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

        <Board
          winner={winner}
          playerSymbol={playerSymbol}
          currentPlayer={currentPlayer}
          squares={squares}
          handlePlayer={handlePlayerMove}
          handleRestartGame={handleRestartGame}
        />

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





export default TicTacToe