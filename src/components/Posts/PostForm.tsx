import { Alert, AlertIcon, AlertTitle, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll} from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './Form/TextInputs';
import ImageUpload from './Form/ImageUpload';
import { Post } from '../../atoms/postsAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useFile from '../../hooks/useFile';

type PostFormProps = { 
  user: User;
};

const Tabs: TabItem[]= [
    {
      title: "Post",
      icon: IoDocumentText,
    },
    {
      title: "Images & Video",
      icon: IoImageOutline,
    },
    {
      title: "Poll",
      icon: BiPoll,
    },
  ];

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
  };

const PostForm:React.FC<PostFormProps> = ({user}) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(Tabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: "",
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {selectedFile, setSelectedFile, onSelectFile} = useFile();

    const handleCreatePost = async() => {
      const {companyId } = router.query;

      // create new post
      const newPost:Post = {
        companyId: companyId as string,
        creatorId: user?.uid,
        userDisplayText: user.email!.split("@")[0],
        title: textInputs.title,
        body: textInputs.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
        editedAt: serverTimestamp() as Timestamp,
        id: ''
      };

      setLoading(true);
      try {
        // store the post in database
        const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
        
        if (selectedFile){
          const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
          await uploadString(imageRef, selectedFile, "data_url");
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(postDocRef, {
            imageURL: downloadURL,
          });
          console.log("HERE IS DOWNLOAD URL", downloadURL);
        }
        // redirect user to main page
        router.back();

      } catch (error: any) {
        setError(true);
        console.log("handleCreatePost error", error); 
      }
      setLoading(false);
      
    };

    const onTextChange = ({
      target: { name, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {Tabs.map((item) => (
                    <TabItem item={item} key={item.title} selected={item.title ===selectedTab} setSelectedTab={setSelectedTab}/>
                ))}
            </Flex>
            <Flex p={3}>
            {selectedTab === "Post" && (
              <TextInputs
                textInputs={textInputs}
                onChange={onTextChange}
                handleCreatePost={handleCreatePost}
                loading={loading}
              />
            )}
            {selectedTab === "Images & Video" && (<ImageUpload selectedFile={selectedFile} onSelectImage={onSelectFile} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile}/>)}
          </Flex>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error creating post!</AlertTitle>
            </Alert>
          )}
        </Flex>
    )
}
export default PostForm;