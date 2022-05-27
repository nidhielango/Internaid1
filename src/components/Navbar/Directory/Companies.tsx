import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateCompanyModal from '../../Modal/Company/CreateCompanyModal';
import { GrAdd} from "react-icons/gr";

type CompaniesProps = {
    
};

const Companies:React.FC<CompaniesProps> = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
        <CreateCompanyModal open={open} handleClose={()=>setOpen(false)}/>
        <MenuItem width="100%" fontSize="10pt" _hover={{bg: "gray.100"}} 
        onClick={()=> setOpen(true)}>
        <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd}/>
            Create Company
        </Flex>
        </MenuItem>
        </>
    )
}
export default Companies;