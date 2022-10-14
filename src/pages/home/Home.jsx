import { Header } from 'layout/header/Header';
import { HomeLeft } from './left/HomeLeft';
import { HomeRight } from './right/HomeRight';

import './Home.scss';
import { Main } from './Main/Main';

export const Home = () => {
  console.log('in Home');

  return (
    <>
      <div className='home_wrapper'>
        <Header />
        <div className='home_bottom_layout'>
          <HomeLeft />
          <Main />
          <HomeRight />
        </div>
      </div>
    </>
  );
};
