import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PageContent from '../../components/Layout/PageContent';
import PostForm from '../../components/Posts/PostForm';


const SubmitPage:React.FC= () => {
    
    return (
        <PageContent>
            <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>CREATE A POST</Text>
            </Box>
            <PostForm/>
            </>
            <>{}</>
        </PageContent>
    );
}
export default SubmitPage;