import React, { useEffect } from 'react'
import { OIcon } from './OIcon';
import { XIcon } from './XIcon'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

interface GameProps{
  winner:string
  handleQuitGame():void;
  handleNewGame():void;
  handleRestartGame():void;
}

export const WinnerModal = ({winner, handleQuitGame, handleNewGame, handleRestartGame} :GameProps) => {
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
        <Modal size='xs'isOpen={winner?true:false} isDismissable={false} backdrop={"blur"} hideCloseButton={true}>
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
        <p>*Game may not start properly, use the restart button at the top to restart the game</p>
        </>
  )
}