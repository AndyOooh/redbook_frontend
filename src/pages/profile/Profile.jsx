import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

import './Profile.scss';
import { Dots } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { ChangeImageModal } from 'features/users/changePicture/ChangeImageModal';
import { useGetUserQuery, useLazyGetUserQuery } from 'features/users/usersApiSlice';
import { Header } from 'layout/header/Header';
import { ProfileBottom } from './ProfileBottom';
import { ProfileSectionsMenu } from './ProfileSectionsMenu';
import { RiMessengerFill } from 'react-icons/ri';
import { FaFacebookMessenger, FaUserFriends } from 'react-icons/fa';

export const Profile = () => {
  const navigate = useNavigate();
  const [changeImageModal, setChangeImageModal] = useState('');

  // const [skip, setSkip] = useState(true);

  const currentUser = useSelector(state => state.auth.user);
  const { username } = useParams();
  console.log('🚀 ~ file: Profile.jsx ~ line 25 ~ username', username);

  const visitor = username ? username !== currentUser.username : false;
  console.log('🚀 ~ file: Profile.jsx ~ line 26 ~ visitor', visitor);
  const [skip, setSkip] = useState(!visitor);

  // const [getUser, { data: otherUser, isLoading }] = useLazyGetUserQuery();

  useEffect(() => {
    console.log('useeffect 2');
    if (visitor) {
      console.log('useeffect 2 setskip false');
      setSkip(false);
    } else if (!visitor && username) {
      console.log('🚀 ~ file: Profile.jsx ~ line 42 ~ else');
      navigate('/profile');
    }
  }, [visitor, navigate, username]);

  const {
    data: otherUser,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserQuery({ userId: username, type: 'profile' }, { skip });
  // } = useGetUserQuery({ userId: username, type: 'profile' }, { visitor });
  console.log('🚀 ~ file: Profile.jsx ~ line 50 ~ otherUser', otherUser);

  // let user = currentUser;
  let user = otherUser ? otherUser : currentUser;
  console.log('user', user);
  useEffect(() => {
    console.log('useeffect ');
    if (isSuccess) {
      console.log('useeffect isSuccess/isError');
      // user = otherUser;
      setSkip(true);
    } else if (isError) {
      console.log('useeffect isError');
      // user = currentUser;
      setSkip(true);
      navigate('/');
    }
  }, [isSuccess, isError, navigate]);

  // not ideal to ask for !user. Should be a better iplementation. how to check for user )= currentUser and if not send req vefore return/render? asl SO
  // remmeber we changed some routing in app.js because clciking another profile routed us ro profile of liogged in user!

  console.log('user', user);
  return isLoading ? (
    // return !user ? (
    <div>Loading...</div>
  ) : (
    <>
      {changeImageModal && (
        <ChangeImageModal
          user={currentUser}
          visible={changeImageModal}
          setVisible={setChangeImageModal}
          type={changeImageModal}
        />
      )}
      <div className='profile'>
        <Header />
        <div className='profile_top'>
          {/* <h1>Prof top</h1> */}
          <div className='profile_container top_container'>
            <div className='cover_photo'>
              <img src={user.covers[0].url} alt='' />
              {!visitor && (
                <button
                  className='btn gray_btn edit_cover_btn'
                  onClick={() => setChangeImageModal('cover')}>
                  <i className='camera_filled_icon'></i>
                  Edit cover Photo
                </button>
              )}
            </div>
            <div className='top_lower'>
              <div className='name_row'>
                <div className='name_row_right'>
                  <div className='prof_image_wrap'>
                    <ProfileImage size='16.8rem' image={user.pictures[0].url} />
                    {!visitor && (
                      <div
                        className='prof_icon_wrapper'
                        onClick={() => setChangeImageModal('profile')}>
                        <i className='camera_filled_icon'></i>
                      </div>
                    )}
                  </div>
                  <div className='name_and_friends'>
                    <h1>
                      {user.first_name} {user.last_name}
                    </h1>
                    <span>{user.friends?.length || 444} Friends</span>
                    <div className='friends_gallery'>
                      <div className='prof_icon_wrapper'>
                        <i className='camera_icon'></i>
                      </div>
                      <div className='prof_icon_wrapper'>
                        <i className='camera_icon'></i>
                      </div>
                      <div className='prof_icon_wrapper'>
                        <i className='camera_icon'></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='name_row_left'>
                  {visitor ? (
                    <>
                      <button className='btn gray_btn'>
                        <FaUserFriends />
                        Friends
                      </button>
                      <button className='btn  red_btn'>
                        {/* <RiMessengerFill /> */}
                        <FaFacebookMessenger />
                        Message
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='btn red_btn'>
                        <BsFillPlusCircleFill />
                        Add to story
                      </button>
                      <button className='btn gray_btn'>
                        <MdModeEditOutline />
                        Edit profile
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className='menu_row'>
                <ProfileSectionsMenu user={user} visitor={visitor} />
                <Dots color='#828387' />
              </div>
            </div>
          </div>
        </div>

        {/* <div className='profile_container '>{user.id && <ProfileBottom user={user.id} />}</div> */}
        <div className='profile_container '>
          <div className='profile_bottom'>
            {user.id && <ProfileBottom user={user} visitor={visitor} />}
          </div>
        </div>
      </div>
    </>
  );
};
