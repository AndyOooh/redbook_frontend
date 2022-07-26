import { useSelector } from 'react-redux';
import { useState } from 'react';

import { LeftLink } from './LeftLink';
import { left } from '../homeData';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from 'assets/svg';
import { Shortcut } from './Shortcut';
import { ProfileImage } from 'components/ProfileImage';
import './HomeLeft.scss';
import { selectCurrentUser } from 'features/auth/authSlice';

export const HomeLeft = () => {
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <section className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover1'>
        <ProfileImage />
        <span>
          {currentUser?.first_name} {currentUser?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
      ))}
      {!visible && (
        <div
          className='left_link hover1'
          onClick={() => {
            setVisible(true);
          }}>
          <div className='small_circle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='more_left'>
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
          ))}
          <div
            className='left_link hover1 '
            onClick={() => {
              setVisible(false);
            }}>
            <div className='small_circle rotate360'>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className='vert_line'></div>
      <div className='shortcut'>
        <div className='heading'>Your Shortcuts</div>
        <div className='edit_shortcut'>Edit</div>
      </div>
      <Shortcut
        link={`https://www.instagram.com/${currentUser.details.socialMedia.youtube}`}
        img='../../images/ytb.png'
        name='My Youtube channel'
      />

      <Shortcut
        link={`https://www.instagram.com/${currentUser.details.socialMedia.instagram}`}
        img='../../images/insta.png'
        name='My Instagram '
      />
      <div className='fb_copyright'>
        <Link to='/'>Privacy - </Link>
        <Link to='/'>Terms - </Link>
        <Link to='/'>Advertising - </Link>
        <Link to='/'>Ad Choices - </Link>
        <Link to='/'>Cookies - </Link>
        <Link to='/'>More.</Link>
        <br />
        Reta © 2022
      </div>
    </section>
  );
};
