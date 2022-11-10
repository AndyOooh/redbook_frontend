import React, { useContext } from 'react';
import { FaFacebookMessenger, FaUserCheck, FaUserPlus, FaUserTimes } from 'react-icons/fa';
import { DotLoader } from 'react-spinners';
import { ProfileContext } from './profileContext/profileContext';

export const VisitorButtons = ({ setShowRequestDropdown }) => {
  const profCtx = useContext(ProfileContext);
  const { visitor, profileUser, handleFriendRequest, friendRequestLoading } = profCtx;
  console.log('🚀 ~ file: VisitorButtons.jsx ~ line 9 ~ profileUser.friendship', profileUser.friendship)

  return (
    visitor &&
    profileUser?.friendship && (
      <>
        {profileUser.friendship.friends ? (
          <button className='btn gray_btn' onClick={() => setShowRequestDropdown(true)}>
            <FaUserCheck />
            Friends
          </button>
        ) : profileUser?.friendship?.requestSent ? (
          <button className='btn red_btn' onClick={() => handleFriendRequest('cancel')}>
            {friendRequestLoading ? (
              <div className='dot_loader'>
                <DotLoader color='var(--white-main)' size={10} loading={friendRequestLoading} />
                Loading...
              </div>
            ) : (
              <>
                <FaUserTimes /> Cancel request
              </>
            )}
          </button>
        ) : profileUser?.friendship.requestReceived ? (
          <button className='btn red_btn' onClick={() => setShowRequestDropdown(true)}>
            {friendRequestLoading ? (
              <div className='dot_loader'>
                <DotLoader color='var(--white-main)' size={10} loading={friendRequestLoading} />{' '}
                Loading...
              </div>
            ) : (
              <>
                <FaUserCheck /> Respond
              </>
            )}
          </button>
        ) : (
          <button className='btn red_btn' onClick={() => handleFriendRequest('add')}>
            {friendRequestLoading ? (
              <div className='dot_loader'>
                <DotLoader color='var(--white-main)' size={10} loading={true} /> Loading...
              </div>
            ) : (
              <>
                <FaUserPlus /> Add Friend
              </>
            )}
          </button>
        )}
        <button className={profileUser.friendship.friends ? 'btn red_btn' : 'btn gray_btn'}>
          <FaFacebookMessenger />
          Message
        </button>
      </>
    )
  );
};
