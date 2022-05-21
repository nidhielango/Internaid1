import { PhoneIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

type SearchProps = {
  
};

const Search:React.FC<SearchProps> = () => {
    
    return (
        <Flex>
            <InputGroup>
            <InputLeftElement 
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" placeholder="Phone number" />
            </InputGroup>
        </Flex>
    )
}
export default Search;