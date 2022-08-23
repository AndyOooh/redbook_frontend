import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { CreatePost } from 'features/posts/CreatePost';
import Stories from './top/Top';
import { ResendVerification } from 'features';
import { VerifyModal } from 'features';
import { Posts } from 'features/posts/components/Posts';

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const verified = useSelector(state => state.auth.user?.verified);
  // const { verified } = useSelector(selectCurrentUser); //might be bad to have state in such a high level component. Verified shouldn't change often though

  const verificationToken = searchParams.get('verificationToken');

  useEffect(() => {
    if (verificationToken) {
      searchParams.delete('verificationToken');
    }
  }, [verificationToken, searchParams]);
  return (
    <>
      {verificationToken && <VerifyModal />}
      {/* <main className='main home'> */}
      <main className='main home_middle scrollbar'>
        {/* <div className='home_middle scrollbar'> */}
        <Stories />
        {!verified && <ResendVerification />}
        <CreatePost />
        <Posts />
        {/* </div> */}
      </main>
    </>
  );
};
