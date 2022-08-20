import { Dots, Friends } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { useGetUserQuery, useLazyGetUserQuery } from 'features/users/usersApiSlice';
import { Header } from 'layout/header';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './Profile.scss';
import { ProfileBottom } from './ProfileBottom';
import { ProfileDetailsMenu, ProfileSectionsMenu } from './ProfileSectionsMenu';

export const Profile = () => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.auth.user);
  console.log("🚀 ~ file: Profile.jsx ~ line 20 ~ Profile ~ currentUser", currentUser)
  const { username } = useParams();
  console.log("🚀 ~ file: Profile.jsx ~ line 22 ~ Profile ~ username", username)

  console.log('skip', skip)

  useEffect(() => {
    // Only trigger query if skip is false. Skip is true if there us a user in params and it's different from logged in user.
    if (username && username !== currentUser.username) {
      console.log('in useeffect if...............')
      setSkip(false);
    }
    // setSkip(username && username !== currentUser.username);
  }, [username, currentUser.username]);

  // passing a trigger as the second argument. If true, the query request will trigger.
  const {
    data: otherUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery({ userId: username, type: 'profile' }, skip);

  console.log('isLoading', isLoading);
  console.log('isSuccess', isSuccess);
  console.log('isError', isError, error);

  // if (isError && !otherUser) {
  //   // Got to homepage if query returns with no user.
  //   navigate('/');
  // }

  let user;
  if (username && username !== currentUser.username) {
    user = { ...otherUser };
  } else {
    user = { ...currentUser };
  }

  // let user = { ...currentUser };
  // if (username && username !== currentUser.username) {
  //   user = { ...otherUser };
  // }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='profile'>
      <Header />
      <div className='profile_top'>
        {/* <h1>Prof top</h1> */}
        <div className='profile_container top_container'>
          <div className='cover_photo'>
            <img src={user.cover} alt='' />
            <button
              className='btn btn_grey edit_cover_btn'
              // onClick={() => setShowCoverMenu(!showCoverMenu)}>
              onClick={() => setShowCoverMenu(true)}>
              {/* <div className='comment_circle_icon hover2' onClick={props.open}> */}
              <i className='camera_icon'></i>
              {/* </div> */}
              Edit cover Photo
            </button>
          </div>
          <div className='top_lower'>
            <div className='name_row'>
              <div className='name_row_right'>
                <div className='prof_image_wrap'>
                  <ProfileImage size='16.8rem' />
                  <div className='prof_icon_wrapper'>
                    <i className='camera_filled_icon'></i>
                  </div>
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
                <button className='btn btn_grey'>
                  <div className='icon_wrapper'>
                    <i className='camera_icon'></i>
                  </div>
                  Add to story
                </button>
                <button className='btn btn_grey'>
                  <div className='icon_wrapper'>
                    <i className='camera_icon'></i>
                  </div>
                  Edit profile
                </button>
              </div>
            </div>
            <div className='menu_row'>
              <ProfileSectionsMenu />
              <Dots color='#828387' />
            </div>
          </div>
        </div>
      </div>

      <div className='profile_bottom'>
        <div className='profile_container bottom_container'>
          <ProfileBottom />
        </div>
      </div>
    </div>
  );
};
