import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
import { ProfileContext } from './profileContext/profileContext';
import { ProfileProvider } from './profileContext/ProfileProvider';

export const Profile = () => {
  const navigate = useNavigate();
  const [changeImageModal, setChangeImageModal] = useState('');
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);

  const user = useSelector(selectCurrentUser);
  const { username } = useParams();

  const profCtx = useContext(ProfileContext);
  console.log('🚀 ~ file: Profile.jsx ~ line 37 ~ profCtx', profCtx);

  const [friendRequest, { isLoading: friendRequestLoading, isSuccess: friendRequestSuccess }] =
    useFriendRequestMutation();

  const visitor = username ? username !== user.username : false;


  profCtx.setVisitor(visitor);
  console.log('🚀 ~ file: Profile.jsx ~ line 37 ~ profCtx', profCtx);

  useEffect(() => {
    if (!visitor && username) {
      navigate('/profile');
    }
  }, [visitor, navigate, username]);

  const {
    data: profileData,
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

  // useEffect(() => {
  //   if (profileData) {
  //     // profCtx.setProfileUser(profileData);
  //     console.log('🚀 ~ file: Profile.jsx ~ line 37 ~ profCtx', profCtx);
  //   }
  // }, [getUserSuccess, profileData, profCtx]);

  const handleFriendRequest = async type => {
    try {
      const { data, message } = await friendRequest({
        receiverId: { receiverId: profileData.id },
        type,
      }).unwrap();
    } catch (error) {
      console.log('handleFriendRequest error: ', error);
    }
  };

  const { profileUser } = profCtx;
  console.log('🚀 ~ file: Profile.jsx ~ line 87 ~ profileUser', profileUser);

  let visitorButtonsJsx;
  if (visitor && profileData?.friendship) {
    visitorButtonsJsx = (
      <>
        {profileData.friendship.friends ? (
          <button className='btn gray_btn' onClick={() => setShowRequestDropdown(true)}>
            <FaUserCheck />
            Friends
          </button>
        ) : profileData?.friendship?.requestSent ? (
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
        ) : profileData?.friendship.requestReceived ? (
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
        <button className={profileData.friendship.friends ? 'btn red_btn' : 'btn gray_btn'}>
          <FaFacebookMessenger />
          Message
        </button>
      </>
    );
  }

  console.log('🚀 ~ file: Profile.jsx ~ line 135 ~ userData', profileData);

  //******************************************** return ********************************************
  return !profileUser || Object.keys(profileData).length === 0 ? (
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
        <div className='profile_top'>
          <div className='profile_container top_container'>
            <div className='cover_photo'>
              <img src={profileData.covers[0]?.url} alt='' />
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
                    <ProfileImage size='16.8rem' image={profileData.pictures[0].url} />
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
                      {profileData.first_name} {profileData.last_name}
                    </h1>
                    <span>{profileData.friends?.length} Friends</span>
                    <div className='friends_gallery'>
                      {profileData.friends?.map(friend => {
                        return (
                          <NavLink key={friend._id} to={`/${friend.username}`} className='friend'>
                            <ProfileImage size='4.8rem' image={friend.pictures[0].url} />
                          </NavLink>
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
                          friendship={profileData.friendship}
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
                <ProfileSectionsMenu user={profileData} visitor={visitor} />
                <Dots color='#828387' />
              </div>
            </div>
          </div>
        </div>

        <div className='profile_container '>
          <div className='profile_bottom'>
            <ProfileBottom user={profileData} visitor={visitor} />
          </div>
        </div>
      </div>
    </>
  );
};
