import { Image, Text, Flex, Link, Skeleton, SkeletonCircle, Stack, Icon, Box, Button } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { Company } from '../../atoms/companiesAtom';
import { firestore } from '../../firebase/clientApp';
import useCompanyData from '../../hooks/useCompanyData';

const Recommendations:React.FC = () => {
    const [companies, setCompanies] =  useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const {companyStateValue, onJoinOrLeaveCompany} = useCompanyData();

    const getCompanyRecommendations = async() => {
        setLoading(true);
        try {
            const companyQuery = query(collection(firestore, 'companies'), orderBy('numberOfMembers', 'desc'), limit(5));
            const companyDocs = await getDocs(companyQuery);
            const companies = companyDocs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCompanies(companies as Company[]);
        } catch (error)  {
            console.log("Recommendation error", error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getCompanyRecommendations();
    }, []);
    
    return (
        <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
      >
          <Flex
            align="flex-end"
            color="white"
            p="6px 10px"
            bg="blue.500"
            height="70px"
            borderRadius="4px 4px 0px 0px"
            fontWeight={600}
            bgImage="url(/images/recommendation.png)"
            backgroundSize="cover"
            bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
            url('images/recommendation.png')"
        >
            Top Companies
        </Flex>  
        <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ): (
            <>
               {companies.map((item, index) => {
                   const isJoined = !!companyStateValue.mySnippets.find(
                       (snippet) => snippet.companyId === item.id
                       );
                       return (
                           <Link key={item.id} href={`/${item.id}`}>
                               <Flex position='relative' align='center' fontSize='10pt' borderBottom='1px solid' borderColor='gray.200' p='10px 12px'>
                                 <Flex width='80%' align='center'>
                                    <Flex width='15%'>
                                        <Text>
                                            {index + 1}
                                        </Text>
                                    </Flex>
                                    <Flex align='center' width='80%'>
                                        {item.imageURL ? (
                                            <Image src={item.imageURL} borderRadius='full' boxSize='20px' mr={2} />
                                        ) : (
                                            <Icon as={GiNotebook} fontSize={30} color='brand.100' mr={2}/>
                                        )}
                                        <span style={{whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {`/${item.id}`}
                                        </span>
                                    </Flex>
                                 </Flex>
                                 <Box position="absolute" right="10px">
                                     <Button onClick={event => {
                                         event.stopPropagation();
                                         onJoinOrLeaveCompany(item, isJoined);
                                         }} 
                                         height='22px' fontSize='8pt' variant={isJoined ? 'outline' : 'solid'}>
                                        {isJoined ? 'Joined' : 'Join'}
                                     </Button>
                                 </Box>
                               </Flex>
                           </Link>
                       )
               })}
               <Box p='10px 20px'>
                   <Button height='30px' width='100%'>View All</Button>
               </Box>
            </>
        )}
        </Flex>   
      </Flex>
    )
}
export default Recommendations;