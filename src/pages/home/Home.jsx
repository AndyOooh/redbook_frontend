import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import CreatePost from 'features/posts';
import Header from 'layout/header';
import LeftHome from './left';
import { RightHome } from './right';
import Stories from './stories';
import { ResendVerification } from 'features';
import { VerifyModal } from 'features';
import './Home.scss';

export const Home = () => {
  console.log('in Home');
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
      <Header />
      <div className='home'>
        <LeftHome />
        <div className='home_middle'>
          <Stories />
          {!verified && <ResendVerification />}
          <CreatePost />
        </div>
        <RightHome />
      </div>
    </>
  );
};
