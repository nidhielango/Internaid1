import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll} from 'react-icons/bi';
import TabItem from './TabItem';
import TextInputs from './Form/TextInputs';

type PostFormProps = { };

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

const PostForm:React.FC<PostFormProps> = () => {
    const [selectedTab, setSelectedTab] = useState(Tabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "",
      body: "",
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const handleCreatePost = async() => {};
    const onSelectImage = () => {};
    const [loading, setLoading] = useState(false);
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
                    <TabItem item={item} selected={item.title ===selectedTab} setSelectedTab={setSelectedTab}/>
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
            
          </Flex>
        </Flex>
    )
}
export default PostForm;