import { Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex } from '@chakra-ui/react';
import React from 'react';
import { authModalState } from '../../../atoms/authModalAtom';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';

const AuthModal:React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
      setModalState((prev) => ({
          ...prev, 
          open: false,
      }));
  };
  return (
    <>

      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={5}>

            <Flex direction="column" align="center" justify="center" width="70%">
               <OAuthButtons/>
               <Text color="gray.600" fontWeight={700}>OR</Text>
               <AuthInputs />
            </Flex>
         
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;

