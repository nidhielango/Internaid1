import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateCompanyModal from '../../Modal/Company/CreateCompanyModal';
import { GrAdd} from "react-icons/gr";
import { companyState } from '../../../atoms/companiesAtom';
import { useRecoilValue } from 'recoil';
import MenuListItem from './MenuListItem';

type CompaniesProps = {

};

const Companies:React.FC<CompaniesProps> = () => {
    const [open, setOpen] = useState(false);
    const mySnippets = useRecoilValue(companyState).mySnippets;

    return (
    <>
      <CreateCompanyModal open={open} handleClose={()=>setOpen(false)}/>
        {mySnippets.find((item) => item.isModerator) && (
            <Box mt={3} mb={4}>
            <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
                MODERATING
            </Text>
            {mySnippets
                .filter((snippet) => snippet.isModerator)
                .map((snippet) => (
                <MenuListItem
                    key={snippet.companyId}
                    icon={GrAdd}
                    displayText={`${snippet.companyId}`}
                    link={`/${snippet.companyId}`}
                    iconColor="brand.100"
                    imageURL={snippet.imageURL}
                />
                ))}
            </Box>
        )}
        
        <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          COMPANIES YOU FOLLOW
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex alignItems="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Add Company
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.companyId}
            icon={GrAdd}
            displayText={`${snippet.companyId}`}
            link={`/${snippet.companyId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>

    </>
    )
}
export default Companies;