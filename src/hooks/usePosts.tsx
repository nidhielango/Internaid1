import React from 'react';
import { useRecoilState } from 'recoil';
import { postState } from '../atoms/postsAtom';

const usePosts = () => {
    const [postStateValue, setPostStateValue]= useRecoilState(postState);
    
    const onVote = async()=> {

    }

    const onSelectPost = () => {};

    const onDeletePost = () => {};

    return {
        postStateValue, 
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost
    };
}
export default usePosts;