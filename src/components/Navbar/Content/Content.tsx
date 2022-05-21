import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';

type contentProps = {
    
};

const content:React.FC<contentProps> = () => {
    
    return (
        <>
        <Flex justify="center" align="center">
            <AuthButtons/>
        </Flex>
        </>
    )
}
export default content;