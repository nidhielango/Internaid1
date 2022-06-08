import { Box, Button, Divider, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Company } from '../../atoms/companiesAtom';
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {RiCakeLine} from "react-icons/ri";
import moment from 'moment';
import { useRouter } from 'next/router';

type AboutProps = {
    companyData: Company;
};

const About:React.FC<AboutProps> = ({companyData}) => {
    const router = useRouter();
    return (
        <Box position="sticky" top="14px">
            <Flex justify="space-between" align="center" bg="blue.400" color="white" p={3} borderRadius="4px 4px 0px 0px">
                <Text fontSize="10pt" fontWeight={700}>About Company</Text>
                <Icon as={HiOutlineDotsHorizontal}/>
            </Flex>
            <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
                <Stack>
                    <Flex width="100%" p={2} fontSize="10pt" fontWeight={700}>
                        <Flex direction="column"  flexGrow={1}>
                            <Text>{companyData.numberOfMembers.toLocaleString()}</Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1}>
                            <Text>...</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider/>
                    <Flex align="center" width="100%" p={1} fontWeight={500} fontSize="10pt">
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        {companyData?.createdAt && (
                        <Text>
                            Created{" "}
                            {moment(
                            new Date(companyData.createdAt!.seconds * 1000)
                            ).format("MMM DD, YYYY")}
                        </Text>
                        )}
                    </Flex>
                    <Link href={`/${router.query.companyId}/submit`}>
                        <Button mt={3} height="30px">Create Post</Button>
                    </Link>
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;