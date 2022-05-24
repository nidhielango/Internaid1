import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading} onClick={()=> signInWithGoogle()}>
             <Image src="/images/google.png" height="20px"/>
             Continue with Google
            </Button> 
        </Flex>
    )
}
export default OAuthButtons;