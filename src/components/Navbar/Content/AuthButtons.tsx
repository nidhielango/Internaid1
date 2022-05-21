import { Button } from '@chakra-ui/react';
import React from 'react';

const AuthButtons:React.FC = () => {
    
    return (
        <>
        <Button variant="outline" height="30px" display={{base:"none", sm:"flex"}}
        width={{base:"70px", md:"110px"}} mr={2}>Log In</Button>
        <Button height="30px" display={{base:"none", sm:"flex"}}
        width={{base:"70px", md:"110px"}} mr={2}>Sign In</Button>
        </>
    )
}
export default AuthButtons;