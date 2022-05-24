import { Button, Flex } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/clientApp';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';

type ContentProps = {
    user: any; 
};

const Content:React.FC<ContentProps> = ({user}) => {
    return (
        
        <>
        <AuthModal />
        <Flex justify="center" align="center">
           {user ? (<Button onClick={() => signOut(auth)}>LOGOUT</Button>
            ): <AuthButtons/>}
        </Flex>
        </>
        
    );
};
export default Content;