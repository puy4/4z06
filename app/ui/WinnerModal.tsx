import React from 'react'
import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

interface GameProps{
  winner:string
  handleQuitGame():void;
  handleNewGame():void;
  handleRestartGame():void;
}

export const WinnerModal = ({winner, handleQuitGame, handleRestartGame} :GameProps) => {
  const [show, setShow] = React.useState(false);


  const closeModal = () => {
    setShow(false);
    console.log("closed");
  };
  
  const OK = () => {
    closeModal()
    handleQuitGame()
  }

  const restart = () => {
    closeModal()
    handleRestartGame()
  }


  return (
      <>
        <Modal size='xs'isOpen={winner?true:false} isDismissable={false} backdrop={`blur`} hideCloseButton={true} placement={`center`}>
          <ModalContent >
            <>
              <ModalHeader className="justify-center">
                WINNER IS
                  </ModalHeader>
                    {winner === "X" ? (<p className='text-8xl text-center'>X</p>):
                    ( <p className='text-8xl text-center'>O</p>) } 
                  <ModalFooter className='w-full flex flex-row items-center justify-between'>
                  <Button variant="light" onPress={OK} >
                    OK
                  </Button>
                  <Button variant="light" onPress={restart} >
                    Play Another
                  </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
  )
}