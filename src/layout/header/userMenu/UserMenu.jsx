import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdHelpCircle } from 'react-icons/io';
import { FaCog, FaMoon } from 'react-icons/fa';
import { RiFeedbackFill } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { TiUserDelete } from 'react-icons/ti';

import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';
import { useLogoutMutation } from 'features/auth/authApiSlice';
import { resetAuthState, selectCurrentUser } from 'features/auth/authSlice';
import { ProfileImage } from 'components/ProfileImage';
import { useDeleteUserMutation } from 'features/users/usersApiSlice';
import { DeleteUserPopup } from './DeleteUserPopup';
import { useClickOutside } from 'hooks/useClickOutside';
import { apiSlice } from 'app/api/apiSlice';

export const UserMenu = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [mode, setMode] = useState(0);
  const [showDeleteUserPopop, setShowDeleteUserPopop] = useState(false);
  
  const usermenuRef = useRef(null);
  useClickOutside(usermenuRef, () => {
    setVisible(false);
  });
  
  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();
  const [deleteUser, {}] = useDeleteUserMutation();

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(resetAuthState());
      dispatch(apiSlice.util.resetApiState());
      navigate('/login');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const deleteUserHandler = async userId => {
    try {
      await deleteUser(userId).unwrap();
      dispatch(resetAuthState());
      dispatch(apiSlice.util.resetApiState());
      navigate('/login');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <div ref={usermenuRef} className='user_menu'>
        {mode === 0 && (
          <>
            <div className='header'>
              <Link to='/profile' className='header_link hover3'>
                <ProfileImage />
                <span>
                  {currentUser?.first_name} {currentUser?.last_name}
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
                setMode(1);
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
                setMode(2);
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
                setMode(3);
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
              </div>
              <span>Logout</span>
            </div>
            <div
              className='mmenu_item hover3'
              onClick={() => setShowDeleteUserPopop(prev => !prev)}
              // onClick={() => setShowCommentMenu(prev => !prev)
            >
              <div className='small_circle'>
                <TiUserDelete className='menu_icon' />
              </div>
              <span>Delete Account</span>
            </div>
          </>
        )}
        {mode === 1 && <SettingsPrivacy setVisible={setMode} />}
        {mode === 2 && <HelpSupport setVisible={setMode} />}
        {mode === 3 && <DisplayAccessibility setVisible={setMode} />}
        {showDeleteUserPopop && (
          <DeleteUserPopup
            visible={showDeleteUserPopop}
            setVisible={setShowDeleteUserPopop}
            deletehandler={deleteUserHandler}
            userId={currentUser.id}
          />
        )}
      </div>
    </>
  );
};
