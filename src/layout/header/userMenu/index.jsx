import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdHelpCircle } from 'react-icons/io';
import { FaCog, FaMoon } from 'react-icons/fa';
import { RiFeedbackFill, RiLogoutBoxRFillRiLogoutBoxRFill } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';

import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';
import { useLogoutMutation } from 'features/auth/authApiSlice';
import { reset } from 'features/auth/authSlice';
import { ProfileImage } from 'components/ProfileImage';

export const UserMenu = () => {
  const [visible, setVisible] = useState(0);
  const { user } = useSelector(state => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    await dispatch(reset());
    navigate('/login');
  };

  return (
    <div className='user_menu'>
      {visible === 0 && (
        <>
          <div className='header'>
            <Link to='/profile' className='header_link hover3'>
              <ProfileImage />
              <span>
                {user?.first_name} {user?.last_name}
              </span>
            </Link>
            <div className='vert_line'></div>
            <span className='see_all_span'>See all profiles</span>
          </div>
          <div className='mmenu_splitter'></div>
          <div className='mmenu_main hover3'>
            <div className='small_circle'>
              <RiFeedbackFill className='menu_icon' />
              {/* <i className='report_filled_icon'></i> */}
            </div>
            <div className='mmenu_col'>
              <div className='mmenu_span1'>Give feedback</div>
              <div className='mmenu_span2'>Help us improve Redbook</div>
            </div>
          </div>
          <div className='mmenu_splitter'></div>
          <div
            className='mmenu_item hover3'
            onClick={() => {
              setVisible(1);
            }}>
            <div className='small_circle'>
              <FaCog className='menu_icon' />
              {/* <i className='settings_filled_icon'></i> */}
            </div>
            <span>Settings & privacy</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div
            className='mmenu_item hover3'
            onClick={() => {
              setVisible(2);
            }}>
            <div className='small_circle'>
              <IoMdHelpCircle className='menu_icon' />
              {/* <i className='help_filled_icon'></i> */}
            </div>
            <span>Help & support</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div
            className='mmenu_item hover3'
            onClick={() => {
              setVisible(3);
            }}>
            <div className='small_circle'>
              <FaMoon className='menu_icon' />
              {/* <i className='dark_filled_icon'></i> */}
            </div>
            <span>Display & Accessibility</span>
            <div className='rArrow'>
              <i className='right_icon'></i>
            </div>
          </div>
          <div className='mmenu_item hover3' onClick={logoutHandler}>
            <div className='small_circle'>
              <TbLogout className='menu_icon' />
              {/* <i className='logout_filled_icon'></i> */}
            </div>
            <span>Logout</span>
          </div>
        </>
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
};
