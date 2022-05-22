
import { Flex } from '@chakra-ui/react';
import React from 'react';
import Content from './Content/Content';
import Search from './Search';

const Navbar:React.FC = () => {
    //  <Image src="/images/logo.png" height="40px"/> Logo
    //  <Image src="/images/logoText.png" height="45px" display={{base: 'none', md: "unset"}}/> Text Image
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
           <Flex align="center">

           </Flex>
        <Search/>
        <Content />
        </Flex>
    )
}
export default Navbar;