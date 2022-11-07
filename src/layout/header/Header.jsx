import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBellFill, BsGrid3X3GapFill } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md';

import './Header.scss';
import { AllMenu } from './AllMenu';
import { UserMenu } from './userMenu/UserMenu';
import RbLogo from 'assets/icons/icon-redbook.png';
import { ProfileImage } from 'components/ProfileImage';
import { NavBar } from './NavBar';
import { SearchBar } from './SearchBar';
import { useUpdateUserMutation } from 'features/users/usersApiSlice';
import { selectCurrentUser, updateUserStore } from 'features/auth/authSlice';

export const Header = () => {
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const { theme, id } = useSelector(selectCurrentUser);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleChangeTheme = async () => {
    const payload = { theme: theme === 'light' ? 'dark' : 'light' };
    try {
      const { data } = await updateUser({
        payload,
        userId: id,
      });
      dispatch(updateUserStore(data.user));
    } catch (error) {
      console.log('🚀 ~ file: Header.jsx ~ line 36 ~ error', error);
    }
  };

  return (
    <header className='header_main'>
      <div className='header_left'>
        <Link to='/' className='logo'>
          <img src={RbLogo} alt='logo' />
        </Link>
        <SearchBar />
      </div>
      <NavBar />
      <div className='header_right'>
        <div className='circle_icon hover1'>
          <BsGrid3X3GapFill onClick={() => setShowAllMenu(prev => !prev)} />
          {showAllMenu && <AllMenu visible={showAllMenu} setVisible={setShowAllMenu} />}
        </div>
        {theme === 'light' ? (
          <div className='circle_icon hover1' onClick={handleChangeTheme}>
            <MdOutlineModeNight />
          </div>
        ) : (
          <div className='circle_icon hover1' onClick={handleChangeTheme}>
            <MdOutlineLightMode />
          </div>
        )}
        <div className='circle_icon hover1'>
          <BsFillBellFill />
          <div className='right_notification'>5</div>
        </div>
        <div onClick={() => setShowUserMenu(prev => !prev)}>
          <ProfileImage className='hover1' size='4rem' isHeader />
        </div>
      </div>
      {showUserMenu && <UserMenu visible={showUserMenu} setVisible={setShowUserMenu} />}
    </header>
  );
};
