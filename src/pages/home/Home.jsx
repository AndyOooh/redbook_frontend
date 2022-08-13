import {Header} from 'layout/header';
import LeftHome from './left';
import { RightHome } from './right';

import './Home.scss';
import { Main } from './Main/Main';

export const Home = () => {
  console.log('in Home');

  return (
    <>
      <div className='home_layout'>
        <Header />
        <LeftHome />
        <Main />
        {/* <main className='home'>
        <div className='home_middle scrollbar'>
          <Stories />
          {!verified && <ResendVerification />}
          <CreatePost />
          <Posts />
        </div>
      </main> */}
        <RightHome />
      </div>
    </>
  );
};
