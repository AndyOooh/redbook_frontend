import { useSelector } from 'react-redux';

import CreatePost from 'features/createPost';
import Header from 'layout/header';
import LeftHome from './left';
import { RightHome } from './right';
import Stories from './stories';
import { ResendVerification } from 'features/auth/resendVerification/ResendVerification';
import './Home.scss';
import { useSearchParams } from 'react-router-dom';
import { VerifyForm } from 'features/auth/verifyAccount/VerifyForm';
import { useEffect } from 'react';
export default function Home() {
  // const { user } = useSelector(auth => ({ ...auth }));
  // const { verified } = useSelector(state => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const verificationToken = searchParams.get('verificationToken');
  console.log('in Home');

  useEffect(() => {
    if (verificationToken) {
      searchParams.delete("verificationToken");
      // console.log("setting params:", { searchParams: searchParams.toString() });
      // console.dir(searchParams.toString());
      // setSearchParams(searchParams);
    }
  }
  , [verificationToken, searchParams]);
  

  // let verificationToken;
  // console.log('verificationToken2: ', verificationToken);
  // useEffect(() => {
  // verificationToken = searchParams.get('verificationToken');
  // console.log('verificationToken: ', verificationToken);
  // }, []);

  return (
    <>
      {/* {verificationToken && <VerifyForm verificationToken={verificationToken} />} */}
      {verificationToken && <VerifyForm />}
      <Header />
      <div className='home'>
        <LeftHome />
        <div className='home_middle'>
          <Stories />
          {/* {!verified && <ResendVerification />} */}
          <ResendVerification />
          <CreatePost />
        </div>
        <RightHome />
      </div>
    </>
  );
}
