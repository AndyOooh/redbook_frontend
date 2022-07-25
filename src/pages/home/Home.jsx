import { useSelector } from 'react-redux';

import CreatePost from 'features/createPost';
import Header from 'layout/header';
import LeftHome from './left';
import { RightHome } from './right';
import Stories from './stories';
import { ResendVerification } from 'features/auth/resendVerification/ResendVerification';
import './Home.scss';
export default function Home() {
  // const { user } = useSelector(auth => ({ ...auth }));
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <div className='home'>
        <LeftHome user={user} />
        <div className='home_middle'>
          <Stories />
          {!user.verified && <ResendVerification />}
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div>
    </>
  );
}
