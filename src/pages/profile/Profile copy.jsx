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
  // const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [showCoverMenu, setShowCoverMenu] = useState(false);

  const profile = useSelector(state => state.auth.user);
  // const user = useSelector(state => state.auth.user);

  const { username } = useParams();
  const navigate = useNavigate();

  console.log('username');

  const [getUser, { data: otherUser, isLoading }] = useLazyGetUserQuery();
  console.log('otherUser1111111', otherUser);

  console.log('usernameæææææææææææææææææ', username);

  // useEffect(() => {
  //   if (!otherUser) {
  //     navigate('/');
  //   }
  // }, [otherUser]);
  
  console.log('otherUser', otherUser);

  let user;
  if (username && username !== profile.username) {
    console.log('in if---------------------');
    //GET user with mutation
    const getOtherUser = async () => {
      const response = await getUser({ userId: username, type: 'profile' }).unwrap();
      console.log('🚀 ~ file: Profile.jsx ~ line 37 ~ getOtherUser ~ response', response);
      // console.log('data---------------------: ', data);
    };
    // const data = await getOtherUser();
    getOtherUser();
    // const { data } = await getUser().unwrap();
    // console.log('data', data);
    console.log('otherUser', otherUser);

    if (!otherUser) {
      console.log('not otherUser!!');
    }
    user = { ...otherUser };
  } else {
    console.log('in else ---------------------');
    user = { ...profile };
  }

  console.log('user', user);
  console.log('profile', profile);




  return (
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
