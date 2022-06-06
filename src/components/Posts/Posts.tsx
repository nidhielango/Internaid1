import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Company } from '../../atoms/companiesAtom';
import { Post } from '../../atoms/postsAtom';
import { firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';

type PostsProps = {
    companyData: Company;
};

const Posts:React.FC<PostsProps> = ({companyData}) => {
    const [loading, setLoading] = useState(false);
    const {postStateValue,setPostStateValue} = usePosts();


    const getPosts = async() => {
        try {
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
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <>
        </>
    )
}
export default Posts;