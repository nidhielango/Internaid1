import { doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Post, postState } from '../atoms/postsAtom';
import { firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
    const [postStateValue, setPostStateValue]= useRecoilState(postState);
    
    const onVote = async()=> {

    }

    const onSelectPost = () => {};

    const onDeletePost = async(post: Post):Promise<boolean> => {
        console.log("DELETING POST: ", post.id);
        try {
             // when post has an image url, delete it from storage
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            
            // delete post from posts collection
            const postDocRef = doc(firestore, "posts", post.id!);
            await deleteDoc(postDocRef);

            // update post state
            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id),
                postsCache: {
                ...prev.postsCache,
                [post.companyId]: prev.postsCache[post.companyId]?.filter(
                    (item) => item.id !== post.id
                ),
                },
            }));

      
           return true;
        } catch (error) {
           return false;
        }
        
    };

    return {
        postStateValue, 
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost
    };
}
export default usePosts;