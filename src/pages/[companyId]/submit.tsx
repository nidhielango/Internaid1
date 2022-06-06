import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageContent from '../../components/Layout/PageContent';
import PostForm from '../../components/Posts/PostForm';
import { auth } from '../../firebase/clientApp';


const SubmitPage:React.FC= () => {
    const [user] = useAuthState(auth);
    return (
        <PageContent>
            <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>CREATE A POST</Text>
            </Box>
            {user && <PostForm user={user}/>}
            </>
            <>{}</>
        </PageContent>
    );
}
export default SubmitPage;