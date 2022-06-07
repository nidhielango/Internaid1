import { Stack } from '@chakra-ui/react';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Company } from '../../atoms/companiesAtom';
import { Post } from '../../atoms/postsAtom';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
    companyData: Company;
};

const Posts:React.FC<PostsProps> = ({companyData}) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const {postStateValue,setPostStateValue, onDeletePost, onSelectPost, onVote} = usePosts();


    const getPosts = async() => {
        try {
            setLoading(true);
            const postsQuery = query(
            collection(firestore, "posts"),
            where("companyId", "==", companyData?.id!),
            orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postsQuery);
            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
                postsCache: {
                ...prev.postsCache,
                [companyData?.id!]: posts as Post[],
                },
                postUpdateRequired: false,
         }));
        } catch (error:any) {
            console.log("getPosts error", error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <>
        {loading? (<PostLoader/>): (
        <Stack>
         {postStateValue.posts.map((item) => (
         <PostItem
            key={item.id}
            post={item}
            userIsCreator={user?.uid === item.creatorId}
            userVoteValue={undefined}
            onVote={onVote}
            onSelectPost={onSelectPost}
            onDeletePost={onDeletePost}/>
         ))}
        </Stack>
        )}
        </>
    )
}
export default Posts;