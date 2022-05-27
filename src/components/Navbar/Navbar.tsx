
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import Content from './Content/Content';
import Directory from './Directory/Directory';
import Search from './Search';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    //  <Image src="/images/logo.png" height="40px"/> Logo
    //  <Image src="/images/logoText.png" height="45px" display={{base: 'none', md: "unset"}}/> Text Image
    return (
        <Flex bg="white" height="44px" padding="6px 12px" justify={{md:"space-between"}}>
           <Flex align="center" width={{base: "40px", md: "auto"}} mr={{base:0, md:2}}>

           </Flex>
           {/* Directory is present only when user logs in */}
           {user && <Directory />} 
        <Search user={user}/>
        <Content user={user}/>
        </Flex>
    )
}
export default Navbar;