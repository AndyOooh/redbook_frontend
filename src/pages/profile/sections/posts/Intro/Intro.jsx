import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import './Intro.scss';

import { updateUserStore } from 'features/auth/authSlice';
import { useUpdateUserMutation } from 'features/users/usersApiSlice';
import { EditDetailsModal } from './EditDetailsModal';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { isEmptyValue } from 'utils/isEmptyValue';
import { DetailInput } from 'pages/profile/DetailInput/DetailInput';

export const Intro = () => {
  const dispatch = useDispatch();
  const {
    profileUser,
    visitor,
    detailsArray,
    resetDetails,
    updatedDetails,
    setUpdatedDetails,
    showDetailInput,
    setShowDetailInput,
    handleShowDetailsInput
  } = useContext(ProfileContext);

  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);

  const [remainingChar, setRemainingChar] = useState(
    profileUser?.bio ? 100 - profileUser?.bio.length : 100
  );

  const handleChange = e => {
    const { name, value, checked } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    setRemainingChar(100 - e.target.value.length);
  };

  const [updateUser, {isLoading}] = useUpdateUserMutation();

  const handleSubmitBio = async () => {
    const payload = updatedDetails;
    const { data } = await updateUser({
      payload,
      userId: profileUser.id,
      path: 'bio',
    });
    const { user, message } = data;
    dispatch(updateUserStore(user));
    resetDetails();
  };

  return (
    <div className='card_main intro'>
      <span className='card_title'>Intro</span>

      {showDetailInput === 'bio' ? (
        <>
          <DetailInput
            name='bio'
            value={updatedDetails.bio}
            changeHandler={handleChange}
            remainingChar={remainingChar}
            cancelHandler={resetDetails}
            saveHandler={handleSubmitBio}
            defaulValue={profileUser.bio}
            path='bio'
            // disabled={updatedDetails.bio === ''}
            // subTitle={subItem.name}
          />
        </>
      ) : // !showUpdateBio
      profileUser?.bio ? (
        <div className='info_col'>
          <span>{profileUser?.bio}</span>
          {!visitor && (
            // <button className='btn grey_btn hover1' onClick={() => setShowUpdateBio(true)}>
            // <button className='btn grey_btn hover1' onClick={() => setShowDetailInput('bio')}>
            <button className='btn grey_btn hover1' onClick={() => handleShowDetailsInput('bio')}>
              Edit Bio
            </button>
          )}
        </div>
      ) : (
        !visitor && (
          <div className='info_col'>
            <button className='btn gray_btn hover1' onClick={() => handleShowDetailsInput('bio')}>
              Add Bio
            </button>
          </div>
        )
      )}

      {detailsArray?.slice(0, 1)[0].subItems.map(
        subItem =>
          !isEmptyValue(subItem.value) && (
            <div key={subItem.name} className='detail_row'>
              <img src={subItem.iconSrc} alt='' />
              <span>{subItem.text}</span>
            </div>
          )
      )}
      {!visitor && (
        <button className='btn gray_btn hover1' onClick={() => setShowEditDetailsModal(true)}>
          Edit Details
        </button>
      )}

      {showEditDetailsModal && !visitor && (
        <EditDetailsModal visible={showEditDetailsModal} setVisible={setShowEditDetailsModal} />
      )}

      {!visitor && <button className='btn gray_btn hover1 '>Add Hobbies</button>}
      {!visitor && <button className='btn gray_btn hover1 '>Add Features</button>}
    </div>
  );
};
