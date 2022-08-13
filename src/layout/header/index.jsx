import { useCallback, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsGrid3X3GapFill } from 'react-icons/bs';

import './index.scss';
import SearchDropdown from './SearchDropdown';
import AllMenu from './AllMenu';
import { useClickOutside } from 'hooks/useClickOutside';
import { UserMenu } from './userMenu';
import RbLogo from 'assets/icons/icon-redbook.png';
import {
  Friends,
  Gaming,
  HomeActive,
  Market,
  Watch,
  Messenger,
  Notifications,
  Search,
} from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { useHoverHandler } from 'hooks/useHoverHandler';
import { NavBar } from './NavBar';

export const Header = () => {
  const { user } = useSelector(state => state.auth);
  const [showTitleBox, setShowTitleBox] = useState(null);
  const hoverHandler = useHoverHandler();

  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header className='header'>
      <div className='header_left'>
        {showSearchMenu && <SearchDropdown color={color} setVisible={setShowSearchMenu} />}
        <Link to='/' className='logo'>
          <img src={RbLogo} alt='logo' />
        </Link>
        <div className='search search1' onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input type='text' placeholder='Search Redbook' className='hide_input' />
        </div>
      </div>

      <NavBar />

      <div className='header_right'>
        <div
          className='circle_icon hover1'
          ref={allmenu}
          onClick={() => setShowAllMenu(prev => !prev)}>
          <BsGrid3X3GapFill />
          {/* <Menu /> */}
          {showAllMenu && <AllMenu />}
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        {/* <ProfileImage className='circle_icon' /> */}
        <div
          // className='header_profile hover1'
          ref={usermenu}
          onClick={() => setShowUserMenu(prev => !prev)}>
          {/* <img src={user?.picture} alt='' /> */}
          <ProfileImage className='hover1' size='4rem' />
          {showUserMenu && <UserMenu />}
        </div>
        {/* <div
          className='circle_icon hover1'
          ref={usermenu}
          onClick={() => setShowUserMenu(prev => !prev)}>
          <ArrowDown />
          {showUserMenu && <UserMenu />}
        </div> */}
      </div>
    </header>
  );
};
