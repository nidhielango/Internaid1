import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { companyState } from '../../atoms/companiesAtom';
import About from '../../components/Company/About';
import PageContent from '../../components/Layout/PageContent';
import PostForm from '../../components/Posts/PostForm';
import { auth } from '../../firebase/clientApp';
import useCompanyData from '../../hooks/useCompanyData';


const SubmitPage:React.FC= () => {
    const [user] = useAuthState(auth);
    
    const {companyStateValue} = useCompanyData();

    return (
        <PageContent>
            <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text>CREATE A POST</Text>
            </Box>
            {user && <PostForm user={user} companyImageURL = {companyStateValue.currentCompany?.imageURL}/>}
            </>
            <>
            {companyStateValue.currentCompany && (
                <About companyData={companyStateValue.currentCompany} />
            )}
            </>
        </PageContent>
    );
}
export default SubmitPage;