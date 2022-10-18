import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Intro.scss';

import { updateUser } from 'features/auth/authSlice';
import { useUpdateUserDetailsMutation } from 'features/users/usersApiSlice';
import { EditDetailsModal } from './EditDetailsModal';
import { UpdateBio } from './UpdateBio';

export const Intro = ({ user, visitor }) => {
  const dispatch = useDispatch();
  const { details } = user;
  console.log('🚀 ~ file: Intro.jsx ~ line 4 ~ details', details);
  console.log('🚀 ~ file: Intro.jsx ~ line 4 ~ vistitor', visitor);

  const [showUpdateBio, setShowUpdateBio] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(true);

  // const [updatedDetails, setUpdatedDetails] = useState(details);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [remainingChar, setRemainingChar] = useState(
    details?.bio ? 100 - details?.bio.length : 100
  );

  const iconsBaseUrl = '../../../../../icons/';

  const detailsArray = [
    {
      name: 'jobAndWorkPlace',
      text:
        details?.job && details?.workPlace
          ? `Works as ${details?.job} at ${details?.workPlace}`
          : details?.job && !details?.workplace
          ? `Works as ${details?.job}`
          : details?.workPlace && !details?.job && `Works at ${details?.workPlace}`,
      icon: iconsBaseUrl + 'job.png',
      value: details?.job || details?.workPlace,
    },
    {
      topic: 'Work',
      multiPossible: true,
      name: 'job',
      icon: iconsBaseUrl + 'job.png',
      value: details?.job,
      lowerCaseAndSpace: 'job',
    },
    {
      topic: 'Work',
      multiPossible: true,
      name: 'workPlace',
      icon: iconsBaseUrl + 'job.png',
      value: details?.workPlace,
      lowerCaseAndSpace: 'workplace',
    },

    {
      topic: 'Education',
      multiPossible: true,
      name: 'college',
      text: `Studied at ${details?.college}`,
      icon: iconsBaseUrl + 'studies.png',
      value: details?.college,
      lowerCaseAndSpace: 'college',
    },
    {
      topic: 'Education',
      multiPossible: true,
      name: 'highSchool',
      text: `Studied at ${details?.highSchool}`,
      icon: iconsBaseUrl + 'studies.png',
      value: details?.highSchool,
      lowerCaseAndSpace: 'high school',
    },
    {
      topic: 'Current City',
      name: 'currentCity',
      text: `Lives in ${details?.currentCity}`,
      icon: iconsBaseUrl + 'home.png',
      value: details?.currentCity,
      lowerCaseAndSpace: 'current city',
    },
    {
      topic: 'Hometown',
      name: 'homeTown',
      text: `From ${details?.homeTown}`,
      icon: iconsBaseUrl + 'home.png',
      value: details?.homeTown,
      lowerCaseAndSpace: 'hometown',
    },
    {
      topic: 'Relationship',
      name: 'relationship',
      text: details?.relationshipStatus,
      icon: iconsBaseUrl + 'relationship.png',
      value: details?.relationshipStatus,
      lowerCaseAndSpace: 'relationship',
    },
    {
      name: 'instagram',
      text: (
        <a
          href={`https://www.instagram.com/${details?.instaGram}`}
          target='_blank'
          rel='noreferrer'>
          {details?.instaGram}
        </a>
      ),
      icon: iconsBaseUrl + 'instagram.png',
      value: details?.instaGram,
      lowerCaseAndSpace: 'instagram',
    },
  ];

  const handleChange = e => {
    const { name, value, checked } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    setRemainingChar(100 - e.target.value.length);
  };

  const [updateUserDetails, { isLoading, isSuccess, error }] = useUpdateUserDetailsMutation();

  const updateDetails = async () => {
    const postData = updatedDetails;
    const { data } = await updateUserDetails({ postData, userId: user.id, field: 'details' });
    const { userData, message } = data;
    dispatch(updateUser(userData));
    setShowUpdateBio(false);
  };

  console.log('details', details);

  return (
    <>
      <span className='card_title'>Intro</span>

      {details?.bio && !showUpdateBio && (
        <div className='info_col'>
          <span className='info_text'>{details?.bio}</span>
          {!visitor && (
            <button className='btn grey_btn hover1' onClick={() => setShowUpdateBio(true)}>
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showUpdateBio && !visitor && (
        <div className='info_col'>
          <button className='btn gray_btn hover1' onClick={() => setShowUpdateBio(true)}>
            Add Bio
          </button>
        </div>
      )}
      {showUpdateBio && (
        <UpdateBio
          setVisible={setShowUpdateBio}
          handleSubmitDetails={updateDetails}
          setUpdatedDetails={setUpdatedDetails}
          remainingChar={remainingChar}
          handleChange={handleChange}
        />
      )}

      {detailsArray.map(
        detail =>
          detail.value &&
          detail.text && (
            <div key={detail.name} className='detail_row'>
              <img src={detail.icon} alt='' />
              <span>{detail.text}</span>
            </div>
          )
      )}
      {!visitor && (
        <button className='btn gray_btn hover1' onClick={() => setShowEditDetailsModal(true)}>
          Edit Details
        </button>
      )}

      {showEditDetailsModal && !visitor && (
        <EditDetailsModal
          details={details}
          detailsArray={detailsArray}
          handleChange={handleChange}
          updateDetails={updateDetails}
          visible={showEditDetailsModal}
          setVisible={setShowEditDetailsModal}
        />
      )}

      {!visitor && <button className='btn gray_btn hover1 '>Add Hobbies</button>}
      {!visitor && <button className='btn gray_btn hover1 '>Add Features</button>}
    </>
  );
};
