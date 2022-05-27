import { Box, Text, Button, Checkbox, Divider, Flex,Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import { HiLockClosed } from "react-icons/hi";

type CreateCompanyModalProps = {
    open: boolean;
    handleClose: () => void; // does not return anything
};

const CreateCompanyModal:React.FC<CreateCompanyModalProps> = ({open, handleClose}) => {
    const [companyName, setCompanyName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(30);
    const [companyType, setCompanyType] = useState("public");

    const onCompanyTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const {
          target: { name },
        } = event;
        if (name === companyType) return;
        setCompanyType(name);
      };
    
    // calculates how many characters are left 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 30) return;
        setCompanyName(event.target.value);
        setCharsRemaining(30 - event.target.value.length);
      };


    return (
       <>
        <ModalWrapper isOpen={open} onClose={handleClose} size="lg">
            <ModalContent>
                <ModalHeader
                    display="flex"
                    flexDirection="column"
                    fontSize={15}
                    padding={3}
                >Create a Company</ModalHeader>
        <Box pr={3} pl={3}>
        <Divider />
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" padding="10px 0px">
          <Text fontWeight={600} fontSize={15}>
            Name
          </Text>
          <Input
            position="relative"
            name="name"
            value={companyName}
            onChange={handleChange}
            pl="22px"
            type={""}
            size="sm"
          />
          <Text
            fontSize="10pt"
            color={charsRemaining === 0 ? "red" : "gray.500"}
            pt={2}
          >
            {charsRemaining} Characters remaining
          </Text>
       
          <Box mt={4} mb={4}>
            <Text fontWeight={600} fontSize={15}>
              Company Type
            </Text>
            <Stack spacing={2} pt={1}>
              <Checkbox
                colorScheme="blue"
                name="public"
                isChecked={companyType === "public"}
                onChange={onCompanyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                  <Text fontSize="10pt" mr={1}>
                    Public
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view, post, and comment to this company
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="restricted"
                isChecked={companyType === "restricted"}
                onChange={onCompanyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view this company, but only approved users can
                    post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="private"
                isChecked={companyType === "private"}
                onChange={onCompanyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Private
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Only approved users can view and submit to this company
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </Box>
                
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
        <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          height="30px"
          onClick={}
        >
          Create Company
        </Button>
      </ModalFooter>
    </ModalContent>
    </Modal>
    </>
    );
};

export default CreateCompanyModal;