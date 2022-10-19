import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { DotLoader } from 'react-spinners';

import './Profile.scss';
import { Dots } from 'assets/svg';
import { ProfileImage } from 'components/ProfileImage';
import { ChangeImageModal } from 'features/users/changePicture/ChangeImageModal';
import { Header } from 'layout/header/Header';
import { ProfileBottom } from './ProfileBottom';
import { ProfileSectionsMenu } from './profileNavigation/ProfileSectionsMenu';
import { RequestDropDown } from './RequestDropDown';
import { ProfileContext } from './profileContext/profileContext';
import { VisitorButtons } from './VisitorButtons';

export const Profile = () => {
  const navigate = useNavigate();
  const [changeImageModal, setChangeImageModal] = useState('');
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);

  const profCtx = useContext(ProfileContext);
  console.log('🚀 ~ file: Profile.jsx ~ line 37 ~ profCtx', profCtx);
  const {
    getUserError,
    username,

    visitor,
    profileUser,
  } = profCtx;

  // navigate to ('/profile') if user is looking at their own profile. NB: don't use !visitor because it defaults to null
  useEffect(() => {
    if (visitor === false && username) {
      navigate('/profile');
    }
  }, [visitor, navigate, username]);

  // if error when fetching profileUser, navigate to ('/profile')
  useEffect(() => {
    if (getUserError) {
      navigate('/');
    }
  }, [getUserError, navigate]);

  //******************************************** return ********************************************
  return !profileUser ? (
    <main className='dotloader_wrapper'>
      <DotLoader
        color='var(--red-main)'
        size={'10rem'}
        // loading={getUserLoading}
        className='dotLoader'
      />
    </main>
  ) : (
    <>
      {changeImageModal && (
        <ChangeImageModal
          visible={changeImageModal}
          setVisible={setChangeImageModal}
          mode={changeImageModal}
        />
      )}
      <div className='profile'>
        <Header />
        <div className='profile_top'>
          <div className='profile_container top_container'>
            <div className='cover_photo'>
              <img src={profileUser.covers[0]?.url} alt='' />
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
                    <ProfileImage size='16.8rem' image={profileUser.pictures[0].url} />
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
                      {profileUser.first_name} {profileUser.last_name}
                    </h1>
                    <span>{profileUser.friends?.length} Friends</span>
                    <div className='friends_gallery'>
                      {profileUser.friends?.map(friend => {
                        return (
                          <NavLink key={friend._id} to={`/${friend.username}`} className='friend'>
                            <ProfileImage size='5rem' image={friend.pictures[0].url} />
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className='name_row_left'>
                  {visitor ? (
                    <>
                      <VisitorButtons setShowRequestDropdown={setShowRequestDropdown} />
                      {showRequestDropdown && (
                        // <div className='request_dropdown_wrapper'>
                        <RequestDropDown
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
                <ProfileSectionsMenu />
                <Dots color='#828387' />
              </div>
            </div>
          </div>
        </div>

        <div className='profile_container '>
          <div className='profile_bottom'>
            <ProfileBottom user={profileUser} visitor={visitor} />
          </div>
        </div>
      </div>
    </>
  );
};
