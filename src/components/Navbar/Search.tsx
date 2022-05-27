import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

type SearchProps = {
    user?: User| null;
};

const Search:React.FC<SearchProps> = ({user}) => {
    
    return (
        <Flex flexGrow={1} mr={2} maxWidth={user? "auto": "600px"} align="center"> 
            <InputGroup>
            <InputLeftElement 
                pointerEvents="none"
                children={<SearchIcon color="gray.300" mb={2}/>}
            />
            <Input placeholder="Search Review..." fontSize="12pt" _placeholder={{color: "gray.500"}} 
            _hover={{bg: "white", border: "1px solid", borderColor: "black.500"}}
            _focus={{outline: "none", border: "1px solid", borderColor: "black.500"}}
            height="30px" bg="gray.50"/>
            </InputGroup>
        </Flex>
    )
}
export default Search;