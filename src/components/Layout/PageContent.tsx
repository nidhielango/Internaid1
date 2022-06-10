import { Flex, Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageContentProps = {
    maxWidth?:string;
    children: React.ReactNode;
};

const PageContent:React.FC<PageContentProps> = ({maxWidth, children}) => {

    return (
        <Flex justify="center" p="16px 0px">
            <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
                <Flex direction="column" width={{base: "100%", md: "65%"}} mr={{ base: 0, md: 6 }}>
                    {children && children[0 as keyof typeof children]}
                </Flex>
                
                <Box  display={{base: "none", md: "flex"}} flexGrow={1}  flexDirection="column">
                    {children && children[1 as keyof typeof children]}
                </Box>
            </Flex>
        </Flex>
    )
}
export default PageContent;