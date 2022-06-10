import { doc, getDoc } from 'firebase/firestore';
import router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from '../../../atoms/postsAtom';
import About from '../../../components/Company/About';
import PageContent from '../../../components/Layout/PageContent';
import PostItem from '../../../components/Posts/PostItem';
import { auth, firestore } from '../../../firebase/clientApp';
import useCompanyData from '../../../hooks/useCompanyData';
import usePosts from '../../../hooks/usePosts';


const PostPage:React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { company, theId } = router.query;
  const { companyStateValue } = useCompanyData();

  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onVote,
  } = usePosts();

  const fetchPost = async () => {
    console.log("FETCHING POST");

    try {
      const postDocRef = doc(firestore, "posts", theId as string);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
  };

  useEffect(() => {
    const { theId } = router.query;

    if (theId && !postStateValue.selectedPost) {
      fetchPost();
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContent>
      <>
            {postStateValue.selectedPost && (
              <>
                <PostItem
                  post={postStateValue.selectedPost}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === postStateValue.selectedPost!.id
                    )?.voteValue
                  }
                  userIsCreator={
                    user?.uid === postStateValue.selectedPost.creatorId
                  }
                />
              </>
            )}
        </>
      <>
        <About companyData = {companyStateValue.currentCompany}/>
      </>
    </PageContent>
  );
}

export default PostPage;