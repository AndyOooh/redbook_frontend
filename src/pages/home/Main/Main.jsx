import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { CreatePost } from 'features/posts/CreatePost';
import { Stories } from './top/Top';
import { ResendVerification } from 'features';
import { VerifyModal } from 'features';
import { PostsArray } from 'features/posts/components/PostsArray';
import { useGetPostsQuery } from 'features/posts/postsApiSlice';
import { selectCurrentUser } from 'features/auth/authSlice';

export const Main = () => {
  const searchParams = useSearchParams()[0];
  const { verified } = useSelector(selectCurrentUser); //might be bad to have state in such a high level component. Verified shouldn't change often though
  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const verificationToken = searchParams.get('verificationToken');

  useEffect(() => {
    if (verificationToken) {
      searchParams.delete('verificationToken');
    }
  }, [verificationToken, searchParams]);
  return (
    <>
      {verificationToken && <VerifyModal />}
      <main className='home_middle scrollbar'>
        <Stories />
        {!verified && <ResendVerification />}
        <CreatePost />
        <PostsArray posts={posts} />
      </main>
    </>
  );
};
