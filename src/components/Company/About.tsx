import { Box, Button, Divider, Flex, Icon, Link, Stack, Image, Text, textDecoration, Spinner } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Company, companyState } from '../../atoms/companiesAtom';
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {RiCakeLine} from "react-icons/ri";
import moment from 'moment';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../../firebase/clientApp';
import { GiNotebook } from 'react-icons/gi';
import useFile from '../../hooks/useFile';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MdBusinessCenter } from 'react-icons/md';

type AboutProps = {
    companyData: Company;
};

const About:React.FC<AboutProps> = ({companyData}) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const selectedFileReference = useRef<HTMLInputElement>(null);
    const {selectedFile, setSelectedFile, onSelectFile} = useFile();
    const [uploadingImage, setUploadingImage] = useState(false);
    const setCompanyStateValue = useSetRecoilState(companyState);

    const onUpdateImage = async () => {
        if (!selectedFile) return;
        try {
            const imageReference = ref(storage, `company/${companyData.id}/image`);
            await uploadString(imageReference, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageReference);
            await updateDoc(doc(firestore, 'companies', companyData.id), {
                imageURl: downloadURL,
            });

            setCompanyStateValue((prev:any) => ({
                ...prev,
                currentCompany: {
                    ...prev.currentCompany, 
                    imageURL: downloadURL
                } as Company,
            }));

        } catch (error) {
            console.log("onUpdateImage error", error)
        }
        setUploadingImage(false);
    }

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
                    <Link href={`/${companyData.id}/submit`}>
                        <Button mt={3} height="30px">Create Post</Button>
                    </Link>
                    {user?.uid === companyData.creatorId && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize="10pt">
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align="center" justify="space-between">
                                    <Text color="blue.500" cursor="pointer" _hover={{textDecoration: "underline"}} onClick={()=> selectedFileReference.current?.click()}>Change Image</Text>
                                {companyData.imageURL || selectedFile ? (
                                     <Image src={selectedFile || companyData.imageURL} borderRadius="full" boxSize="40px" alt="Company Image"/>
                                ): (
                                    <Icon as={MdBusinessCenter} fontSize={30} color="brand.100" mr={2}/>
                                )}
                                </Flex>
                                {selectedFile && (
                                    uploadingImage ? <Spinner /> :
                                     (<Text cursor="pointer" onClick={onUpdateImage}>Save Changes</Text>)
                                )}
                                <input id="file-upload" type="file" accept="image/x-png,image/gif,image/jpeg"
                                hidden ref={selectedFileReference} onChange={onSelectFile}/>
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;