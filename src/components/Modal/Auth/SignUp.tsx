import { Input, Button, Flex , Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';


const SignUp:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: "", 
        password: "",
        confirmPassword: "",
    })

    const onSubmit = () => {};

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev, 
            [event.target.name]: event.target.value,  
        }))
    }; 

    return (
        <form onSubmit={onSubmit}>
            <Input required
            name="email" placeholder="email" type="email" mb={2} fontSize="10pt" 
            _placeholder={{color: "gray.500"}} _hover={{bg:"white", border: "1px solid", borderColor: "blue.500",}} bg="gray.60"
            onChange={onChange}/>
            <Input required
            name="password" placeholder="password" type="password" mb={2} fontSize="10pt" 
            _placeholder={{color: "gray.500"}} _hover={{bg:"white", border: "1px solid", borderColor: "blue.500",}} bg="gray.60"
            onChange={onChange}/>
            <Input required
            name="confirmPassword" placeholder="confirmPassword" type="password" mb={2} fontSize="10pt" 
            _placeholder={{color: "gray.500"}} _hover={{bg:"white", border: "1px solid", borderColor: "blue.500",}} bg="gray.60"
            onChange={onChange}/>
            <Button width="100%" height="36px" mt={2} mb={2} type="submit">
                SIGN UP
            </Button>
            <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>Have an account?</Text>
                <Text color="blue.600" fontWeight={700} cursor="pointer" 
                onClick={()=> setAuthModalState((prev) => ({
                    ...prev, 
                    view: "login",
                }))}>
                    LOG IN
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;