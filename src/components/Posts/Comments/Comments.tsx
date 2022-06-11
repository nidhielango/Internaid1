import { Box, Flex, Text, Stack, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { collection, doc, increment, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Post } from '../../../atoms/postsAtom';
import { firestore } from '../../../firebase/clientApp';
import CommentInputs from './CommentInputs';
import CommentItem, {Comment} from './CommentItem';

type CommentsProps = { 
    user: User;
    selectedPost: Post | null;
    companyId: string;
};

const Comments:React.FC<CommentsProps> = ({user, selectedPost, companyId,}) => {
    
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);


    const onCreateComment = async (commentText: string) => {

        setCreateLoading(true);
        try {
            const batch = writeBatch(firestore);

            // create comment document 
            const commentDocRef = doc(collection(firestore,"comments"));

            const newComment: Comment = {
                id: commentDocRef.id, 
                creatorId: user.uid,
                creatorDisplayText: user.email!.split("@")[0],
                companyId,
                postId: selectedPost?.id!,
                postTitle: selectedPost?.title!,
                text: commentText, 
                createdAt: serverTimestamp() as Timestamp,
            };

            batch.set(commentDocRef, newComment);

            newComment.createdAt = { seconds: Date.now()/1000} as Timestamp;

            // update number of comments 
            const postDocRef = doc(firestore, "posts", selectedPost?.id!);

            batch.update(postDocRef, {
                numberOfComments: increment(1),
            });

            await batch.commit();

            // update client recoil state 

            setCommentText("");
            setComments(prev=> [newComment, ...prev])


        } catch (error) {
            console.log("onCreateComment", error)
        }
        setCreateLoading(false);
    };

    const onDeleteComment = async (comment: Comment) => {
        // delete comment document 

        // update number of comments 

        // update client recoil state 
    };
    
    const getPostComments = async() => {};


    useEffect(() => {
      
    }, [])
    

    return (
    <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        <CommentInputs
          commentText={commentText}
          setCommentText={setCommentText}
          createLoading={createLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
                <Flex
                 direction="column"
                 justify="center"
                 align="center"
                 borderTop="1px solid"
                 borderColor="gray.100"
                 p={20}
               >
                 <Text fontWeight={700} opacity={0.3}>
                   No Comments Exist
                 </Text>
               </Flex>
            ) : (
                <>
                {comments.map(comment => (
                    <CommentItem
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={false}
                    userId={user.uid}
                    />
                ))}
                </>
            )}
          </>
        )}
      </Stack>
    </Box>
    );

}
export default Comments;