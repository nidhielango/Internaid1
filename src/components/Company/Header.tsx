import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { MdBusinessCenter } from 'react-icons/md';
import { Company } from '../../atoms/companiesAtom';
import useCompanyData from "../../hooks/useCompanyData";

type HeaderProps = {
    companyData: Company;
};

const Header:React.FC<HeaderProps> = ({companyData}) => {
    
    // read from company snippets
    const {companyStateValue, onJoinOrLeaveCompany, loading} = useCompanyData();
    const isJoined = !!companyStateValue.mySnippets.find(item => item.companyId === companyData.id) // !! -> boolean value 
    return (
        <Flex direction="column" width="100%" height="146px">
            <Box height="50%" bg="blue.400"/>
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex width="95%" maxWidth="860px">
                    {companyStateValue.currentCompany?.imageURL ? (<Image 
                    borderRadius="full"
                    boxSize="66px"
                    src={companyStateValue.currentCompany.imageURL}
                    alt=""
                    position="relative"
                    top={-3}
                    color="blue.500"
                    border="4px solid white"/>):
                    (<Icon as={MdBusinessCenter} fontSize={64} position="relative" top={-3} color="blue.500" border="4px solid white"
                    borderRadius="50%"/>)}
                <Flex padding="10px 16px">
                <Flex direction="column" mr={6}>
                    <Text fontWeight={800} fontSize="16pt">{companyData.id}</Text>
                    <Text fontWeight={600} fontSize="10pt" color="gray.400">{companyData.id}</Text>
                </Flex>
                <Button
                 variant={isJoined ? "outline" : "solid"}
                 height="30px"
                 pr={6}
                 pl={6}
                 onClick={() => onJoinOrLeaveCompany(companyData,isJoined)}
                 isLoading={loading}
                >{isJoined ? "Joined":"Join"}</Button>
                </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
export default Header;