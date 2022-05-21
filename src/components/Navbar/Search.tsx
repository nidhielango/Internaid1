import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type SearchProps = {
  
};

const Search:React.FC<SearchProps> = () => {
    
    return (
        <Flex flexGrow={1} mr={2} align="center"> 
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