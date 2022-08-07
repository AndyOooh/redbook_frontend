import { Link } from 'react-router-dom';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

import './index.scss';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import { useClickOutside } from 'hooks/useClickOutside';
import { UserMenu } from './userMenu';
// import { getUser } from 'features/auth/authSlice';
import RbLogo from 'assets/icons/icon-redbook.png';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  // Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from 'assets/svg';

export default function Header() {
  const { user } = useSelector(state => state.auth);

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
    <header>
      <div className='header_left'>
        <Link to='/'>
          <div className='circle'>
            <img src={RbLogo} alt='logo' />
            {/* <Logo /> */}
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}>
          <Search color={color} />
          <input type='text' placeholder='Search Redbook' className='hide_input' />
        </div>
      </div>
      {showSearchMenu && <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />}
      <div className='header_middle'>
        <Link to='/' className='middle_icon active'>
          <HomeActive />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Friends color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1 '>
          <Gaming color={color} />
        </Link>
      </div>
      <div className='header_right'>
        {/* <Link to='/profile' className='profile_link hover1'>
          <img src={user?.picture} alt='' />
          <span>{user?.first_name}</span>
        </Link> */}
        <Link to='/profile' className='profile_link hover1'>
          <img src={user?.picture} alt='' />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className='circle_icon hover1'
          ref={allmenu}
          onClick={() => {
            setShowAllMenu(prev => !prev);
          }}>
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
        <div
          className='circle_icon hover1'
          ref={usermenu}
          onClick={() => {
            setShowUserMenu(prev => !prev);
          }}>
          <ArrowDown />

          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
}
