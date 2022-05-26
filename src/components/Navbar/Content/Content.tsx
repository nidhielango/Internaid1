import { Button, Flex} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/clientApp';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import Icons from './Icons';
import NavMenu from "./NavMenu";

type ContentProps = {
    user?: User| null; 
};

const Content:React.FC<ContentProps> = ({user}) => {
    return (
        
        <>
        <AuthModal />
        <Flex justify="center" align="center">
           {user ? <Icons/> : <AuthButtons/>}
           <NavMenu user={user}/>
        </Flex>
        </>
        
    );
};
export default Content;