import { doc, deleteDoc, writeBatch, collection, getDocs, query, where } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import { companyState } from '../atoms/companiesAtom';
import { Post, postState, PostVote } from '../atoms/postsAtom';
import { auth, firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue]= useRecoilState(postState);
    const currentCompany = useRecoilValue(companyState).currentCompany;
    const setAuthModalState = useSetRecoilState(authModalState);
    
    const onVote = async(post: Post, vote:number, companyId: string)=> {

        // check for user: if user does not exist -> open auth modal
        if (!user?.uid) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }


        try {
           
            const {voteStatus} = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

            const batch = writeBatch(firestore);
            const updatedPost = {...post};
            const updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            // new vote
            if (!existingVote){
                // new postVote document 
                const postVoteReference = doc(collection(firestore, 'users', `${user?.uid}/postVotes`));
                const newVote: PostVote = {
                    id: postVoteReference.id,
                    postId: post.id,
                    companyId,
                    voteValue: vote, 
                };
                
                batch.set(postVoteReference, newVote);
                
                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];

            } 
            // vote exists 
            else {

                const postVoteRef = doc(firestore,"users",`${user?.uid}/postVotes/${existingVote.id}`);
                // remove vote
                if (existingVote.voteValue === vote){
                    voteChange *= -1;
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter(
                        (vote) => vote.id !== existingVote.id
                    );
                    batch.delete(postVoteRef);
                    
                }
                // flip vote 
                else {
                    voteChange = 2 * vote;
                    updatedPost.voteStatus = voteStatus + 2 * vote;
                    const voteId = postStateValue.postVotes.findIndex(
                      (vote) => vote.id === existingVote.id
                    );
                    
                    if (voteId !== -1) {
                        updatedPostVotes[voteId] = {
                          ...existingVote,
                          voteValue: vote,
                        };
                      }
                      batch.update(postVoteRef, {
                        voteValue: vote,
                      });
                }
    
            } 

            const postId = postStateValue.posts.findIndex(item => item.id === post.id);
            updatedPosts[postId] = updatedPost;
            setPostStateValue((prev)=> ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes,
            }));
             

            const postReference = doc(firestore, "posts", post.id!);
            batch.update(postReference, {voteStatus: voteStatus+ voteChange})
            await batch.commit();
            
            
        } catch (error) {
            console.log("Vote error", error);
            
        }
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

    const getCompanyPostVotes = async (companyId: string) => {
        const postVotesQuery = query(
          collection(firestore, `users/${user?.uid}/postVotes`),
          where("companyId", "==", companyId)
        );
        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          postVotes: postVotes as PostVote[],
        }));
      };
    
      useEffect(() => {
        if (!user || currentCompany?.id) return;
        getCompanyPostVotes(currentCompany?.id);
      }, [user, currentCompany]);

      useEffect(() => {
        // if user logs out or is not authenticated
        if (!user?.uid ) {
          setPostStateValue((prev) => ({
            ...prev,
            postVotes: [],
          }));
          return;
        }
      }, [user]);
    

    return {
        postStateValue, 
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost
    };
}
export default usePosts;