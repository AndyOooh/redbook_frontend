import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import {
  FaFacebookMessenger,
  FaUserCheck,
  FaUserFriends,
  FaUserPlus,
  FaUserTimes,
} from 'react-icons/fa';

import './Profile.scss';
import { Dots } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { ChangeImageModal } from 'features/users/changePicture/ChangeImageModal';
import {
  useGetUserQuery,
  useLazyGetUserQuery,
  useSendFriendRequestMutation,
  useFriendRequestMutation,
} from 'features/users/usersApiSlice';
import { Header } from 'layout/header/Header';
import { ProfileBottom } from './ProfileBottom';
import { ProfileSectionsMenu } from './ProfileSectionsMenu';
import { updateUser } from 'features/auth/authSlice';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeImageModal, setChangeImageModal] = useState('');
  // const params = useParams();
  // const { pathname } = useLocation();

  const currentUser = useSelector(state => state.auth.user);
  const { username } = useParams();

  const visitor = username ? username !== currentUser.username : false;
  const [skip, setSkip] = useState(!visitor);
  const [friendRequest, { error, isLoading: friendRequestLoading }] = useFriendRequestMutation();

  // was trying to avoid 'unauthorixed on /profile/someotherusername. Cant recreate the issue but a new
  // one: should redirect to /profile if on /profile/somenonsense
  // if (visitor && pathname.includes('profile')) {
  //   console.log('navigating to username')
  //   navigate(`${username}`);
  // }

  const handleFriendRequest = async type => {
    console.log('receiver ***************user.id', user.id)
    try {
      const { data, message } = await friendRequest({
        receiverId: { receiverId: user.id },
        type,
      }).unwrap();
      dispatch(updateUser(data));
    } catch (error) {}
  };

  useEffect(() => {
    if (visitor) {
      setSkip(false);
    } else if (!visitor && username) {
      navigate('/profile');
    }
  }, [visitor, navigate, username]);

  const {
    data: otherUser,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserQuery({ userId: username, type: 'profile' }, { skip });

  let user = otherUser ? otherUser : currentUser;
  useEffect(() => {
    if (isSuccess) {
      setSkip(true);
    } else if (isError) {
      setSkip(true);
      navigate('/');
    }
  }, [isSuccess, isError, navigate]);

  const visitorButtons = (
    <>
      {currentUser.friends.includes(user.id) ? (
        <button className='btn gray_btn'>
          <FaUserCheck />
          Friends
        </button>
      ) : currentUser.requestsSent?.includes(user.id) ? (
        <button className='btn red_btn'>
          <FaUserTimes /> Requested
        </button>
      ) : currentUser.requestsReceived?.includes(user.id) ? (
        // not done yet
        <button className='btn red_btn' onClick={() => handleFriendRequest('accept')}>
          <FaUserTimes /> Accept request
        </button>
      ) : (
        <button className='btn red_btn' onClick={() => handleFriendRequest('add')}>
          <FaUserPlus />
          Add Friend
        </button>
      )}
      <button className={currentUser.friends.includes(user.id) ? 'btn red_btn' : 'btn gray_btn'}>
        <FaFacebookMessenger />
        Message
      </button>
    </>
  );

  // not ideal to ask for !user. Should be a better iplementation. how to check for user )= currentUser and if not send req vefore return/render? asl SO
  // remmeber we changed some routing in app.js because clciking another profile routed us ro profile of liogged in user!

  console.log('🚀 ~ file: Profile.jsx ~ line 43 ~ user', user);
  return isLoading ? (
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
                    <span>{user.friends?.length} Friends</span>
                    <div className='friends_gallery'>
                      {user.friends.map(friend => {
                        return (
                          <ProfileImage
                            key={friend.id}
                            size='3rem'
                            // image={friend.picture[0].url}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className='name_row_left'>
                  {visitor ? (
                    { ...visitorButtons }
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

        <div className='profile_container '>
          <div className='profile_bottom'>
            {user.id && <ProfileBottom user={user} visitor={visitor} />}
          </div>
        </div>
      </div>
    </>
  );
};
