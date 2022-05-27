import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

type CreateCompanyModalProps = {
    open: boolean;
    handleClose: () => void; // does not return anything
};

const CreateCompanyModal:React.FC<CreateCompanyModalProps> = ({open, handleClose}) => {
    
    return (
        <>
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Title</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>Body</ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="ghost">
                        Create Company
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
export default CreateCompanyModal;