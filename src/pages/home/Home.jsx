import { Header } from 'layout/header/Header';
import LeftHome from './left/HomeLeft';
import { RightHome } from './right';

import './Home.scss';
import { Main } from './Main/Main';

export const Home = () => {
  console.log('in Home');

  return (
    <>
      <div className='home_wrapper'>
        <Header />
        <div className='home_bottom_layout'>
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
      </div>
    </>
  );
};
