import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll} from 'react-icons/bi';
import TabItem from './TabItem';

type PostFormProps = { };

const Tabs = [
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
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {Tabs.map((item) => (
                    <TabItem item={item} selected={item.title ===selectedTab} setSelectedTab={setSelectedTab}/>
                ))}
            </Flex>
        </Flex>
    )
}
export default PostForm;