import { Stack } from '@chakra-ui/react';
import { query, collection, orderBy, limit, getDocs, where } from 'firebase/firestore';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post, PostVote } from '../atoms/postsAtom';
import CreatePost from '../components/Company/CreatePost';
import PostHome from '../components/Company/PostHome';
import Recommendations from '../components/Company/Recommendations';
import PageContent from '../components/Layout/PageContent'
import PostItem from '../components/Posts/PostItem';
import PostLoader from '../components/Posts/PostLoader';
import { auth, firestore } from '../firebase/clientApp';
import useCompanyData from '../hooks/useCompanyData';
import usePosts from '../hooks/usePosts';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {postStateValue,setPostStateValue,onVote,onSelectPost,onDeletePost,} = usePosts();
  const {companyStateValue} = useCompanyData();

  const buildUserHomeFeed = async () => {

    setLoading(true);
    try {
      
      if (companyStateValue.mySnippets.length){
        // get posts from the companies a user follows
        const myCompanyIds = companyStateValue.mySnippets.map((snippet) => snippet.companyId);
        const postQuery = query(collection(firestore, "posts"), where("companyId", "in", myCompanyIds), limit(10));
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc)=> ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue(prev => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildUserHomeFeed();
      }
      
    } catch (error) {
      console.log("buildUserHomeFeed error", error);
    }
    setLoading(false);

  };

  const buildNoUserHomeFeed = async() => {
    setLoading(true);
    console.log("User feed does not exist");
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(15)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NO USER FEED", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map(post => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds)
      )
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }))

      setPostStateValue(prev => ({
        ...prev, 
        postVotes: postVotes as PostVote[]
      }))

    } catch (error) {
      console.log('getUserPostVotes error', error);
    }
  };

  // useEffects

  useEffect(()=> {
    if (companyStateValue.initSnippetsFetched) {
      buildUserHomeFeed()
    }
  }, [companyStateValue.initSnippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed()
    };
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) {
      getUserPostVotes();
    };

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
    };
  }, [user, postStateValue.posts]);

  return (
    <PageContent>
      <>
      <CreatePost/>
      {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>
      <Stack spacing={5}>
        <Recommendations/>
        <PostHome/>
      </Stack>
      </>
    </PageContent>
  );
}

export default Home
