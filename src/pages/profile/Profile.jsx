import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import {
  FaFacebookMessenger,
  FaUserCheck,
  // FaUserFriends,
  FaUserPlus,
  FaUserTimes,
} from 'react-icons/fa';
import { DotLoader } from 'react-spinners';

import './Profile.scss';
import { Dots } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { ChangeImageModal } from 'features/users/changePicture/ChangeImageModal';
import { useGetUserQuery, useFriendRequestMutation } from 'features/users/usersApiSlice';
import { Header } from 'layout/header/Header';
import { ProfileBottom } from './ProfileBottom';
import { ProfileSectionsMenu } from './profileNavigation/ProfileSectionsMenu';
import { selectCurrentUser } from 'features/auth/authSlice';
import { RequestDropDown } from './RequestDropDown';

export const Profile = () => {
  const navigate = useNavigate();
  const [changeImageModal, setChangeImageModal] = useState('');
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { username } = useParams();

  const [friendRequest, { isLoading: friendRequestLoading, isSuccess: friendRequestSuccess }] =
    useFriendRequestMutation();

  const visitor = username ? username !== user.username : false;

  useEffect(() => {
    if (!visitor && username) {
      navigate('/profile');
    }
  }, [visitor, navigate, username]);

  const {
    data: userData,
    isLoading: getUserLoading,
    isSuccess: getUserSuccess,
    isError: getUserError,
  } = useGetUserQuery({
    userId: username || user.username,
    type: 'profile',
  });

  useEffect(() => {
    if (getUserError) {
      navigate('/');
    }
  }, [getUserError, navigate]);

  const handleFriendRequest = async type => {
    try {
      const { data, message } = await friendRequest({
        receiverId: { receiverId: userData.id },
        type,
      }).unwrap();
    } catch (error) {
      console.log('handleFriendRequest error: ', error);
    }
  };

  let visitorButtonsJsx;
  if (visitor && userData?.friendship) {
    visitorButtonsJsx = (
      <>
        {userData.friendship.friends ? (
          <button className='btn gray_btn' onClick={() => setShowRequestDropdown(true)}>
            <FaUserCheck />
            Friends
          </button>
        ) : userData?.friendship?.requestSent ? (
          <button className='btn red_btn' onClick={() => handleFriendRequest('cancel')}>
            {friendRequestLoading ? (
              <>
                <DotLoader color='var(--white-main)' size={10} loading={friendRequestLoading} />{' '}
                Loading...
              </>
            ) : (
              <>
                <FaUserTimes /> Cancel request
              </>
            )}
          </button>
        ) : userData?.friendship.requestReceived ? (
          <button className='btn red_btn' onClick={() => setShowRequestDropdown(true)}>
            {friendRequestLoading ? (
              <>
                <DotLoader color='var(--white-main)' size={10} loading={friendRequestLoading} />{' '}
                Loading...
              </>
            ) : (
              <>
                <FaUserCheck /> Respond
              </>
            )}
          </button>
        ) : (
          <button className='btn red_btn' onClick={() => handleFriendRequest('add')}>
            {friendRequestLoading ? (
              <>
                <DotLoader color='var(--white-main)' size={10} loading={true} /> Loading...
              </>
            ) : (
              <>
                <FaUserPlus /> Add Friend
              </>
            )}
          </button>
        )}
        <button className={userData.friendship.friends ? 'btn red_btn' : 'btn gray_btn'}>
          <FaFacebookMessenger />
          Message
        </button>
      </>
    );
  }

  console.log('🚀 ~ file: Profile.jsx ~ line 135 ~ userData', userData);
  //******************************************** return ********************************************
  return getUserLoading || Object.keys(userData).length === 0 ? (
    <main className='dotloader_wrapper'>
      <DotLoader
        color='var(--red-main)'
        size={'10rem'}
        loading={getUserLoading}
        className='dotLoader'
      />
    </main>
  ) : (
    <>
      {changeImageModal && (
        <ChangeImageModal
          user={user}
          visible={changeImageModal}
          setVisible={setChangeImageModal}
          type={changeImageModal}
        />
      )}
      <div className='profile'>
        <Header />
        <main>
          <div className='profile_top'>
            <div className='profile_container top_container'>
              <div className='cover_photo'>
                <img src={userData.covers[0]?.url} alt='' />
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
                      <ProfileImage size='16.8rem' image={userData.pictures[0].url} />
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
                        {userData.first_name} {userData.last_name}
                      </h1>
                      <span>{userData.friends?.length} Friends</span>
                      <div className='friends_gallery'>
                        {userData.friends?.map(friend => {
                          return (
                            <ProfileImage
                              key={friend._id}
                              size='4.8rem'
                              image={friend.pictures[0].url}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className='name_row_left'>
                    {visitor ? (
                      <>
                        {visitorButtonsJsx}
                        {showRequestDropdown && (
                          // <div className='request_dropdown_wrapper'>
                          <RequestDropDown
                            handleFriendRequest={handleFriendRequest}
                            friendship={userData.friendship}
                            visible={showRequestDropdown}
                            setVisible={setShowRequestDropdown}
                          />
                        )}
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
                  <ProfileSectionsMenu user={userData} visitor={visitor} />
                  <Dots color='#828387' />
                </div>
              </div>
            </div>
          </div>

          <div className='profile_container '>
            <div className='profile_bottom'>
              <ProfileBottom user={userData} visitor={visitor} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
