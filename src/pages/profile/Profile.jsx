import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import './Profile.scss';
import { Dots } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { ChangeImageModal } from 'features/users/changePicture/ChangeImageModal';
import { useGetUserQuery, useLazyGetUserQuery } from 'features/users/usersApiSlice';
import { Header } from 'layout/header';
import { ProfileBottom } from './ProfileBottom';
import { ProfileSectionsMenu } from './ProfileSectionsMenu';

export const Profile = () => {
  const [changeImageModal, setChangeImageModal] = useState('');
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();

  // const [getUser, { data: otherUser, isLoading }] = useLazyGetUserQuery();
  const currentUser = useSelector(state => state.auth.user);
  const { username } = useParams();

  const {
    data: otherUser,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserQuery({ userId: username, type: 'profile' }, { skip });

  useEffect(() => {
    console.log('useeffect ');
    if (isSuccess || isError) {
      console.log('useeffect isSuccess/isError');
      setSkip(true);
    } else if (isError) {
      console.log('useeffect isError');
      navigate('/');
    }
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    console.log('useeffect 2');
    if (username && username !== currentUser.username) {
      console.log('useeffect 2 IF');
      setSkip(false);
    }
  }, [username, currentUser.username]);

  let user;
  if (username && username !== currentUser.username) {
    user = { ...otherUser };
  } else {
    user = { ...currentUser };
  }

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
          {/* <h1>Prof top</h1> */}
          <div className='profile_container top_container'>
            <div className='cover_photo'>
              <img src={user.covers[0].url} alt='' />
              <button
                className='btn btn_grey edit_cover_btn'
                onClick={() => setChangeImageModal('cover')}>
                <i className='camera_icon'></i>
                Edit cover Photo
              </button>
            </div>
            <div className='top_lower'>
              <div className='name_row'>
                <div className='name_row_right'>
                  <div className='prof_image_wrap'>
                    <ProfileImage size='16.8rem' />
                    <div
                      className='prof_icon_wrapper'
                      onClick={() => setChangeImageModal('profile')}>
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
          <div className='profile_container '>{user.id && <ProfileBottom user={user.id} />}</div>
        </div>
      </div>
    </>
  );
};
