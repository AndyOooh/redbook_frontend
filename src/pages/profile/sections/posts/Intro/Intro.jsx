import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import './Intro.scss';

import { updateUser } from 'features/auth/authSlice';
import { useUpdateUserDetailsMutation } from 'features/users/usersApiSlice';
import { EditDetailsModal } from './EditDetailsModal';
import { UpdateBio } from './UpdateBio';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';

export const Intro = () => {
  const dispatch = useDispatch();
  const { profileUser, visitor } = useContext(ProfileContext);
  const { details } = profileUser;

  const [showUpdateBio, setShowUpdateBio] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);

  // const [updatedDetails, setUpdatedDetails] = useState(details);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [remainingChar, setRemainingChar] = useState(
    details?.bio ? 100 - details?.bio.length : 100
  );
  const iconsBaseUrl = '../../../../../icons/';

  let detailsArr = [];
  Object.entries(details).forEach(([key, value]) => {
    detailsArr.push({ name: key, value });
  });

  const newArr = detailsArr.map(det => {
    const { name } = det;
    const nameLowerCase =
      name.toLowerCase() === name ? name.replace(/([A-Z])/g, ' $1').toLowerCase() : name;
    const iconName =
      name === 'highSchool' || name === 'college'
        ? 'studies'
        : name === 'relationshipStatus'
        ? 'relationship'
        : name === 'currentCity'
        ? 'home'
        : name === 'hometown'
        ? 'home'
        : 'job';
    const icon = iconsBaseUrl + iconName + '.png';

    return { ...det, lowerCaseAndSpace: nameLowerCase, icon: icon };
  });

  const detailsArray = [
    {
      name: 'jobAndWorkPlace',
      introText:
        details?.job && details?.workPlace
          ? `Works as ${details?.job} at ${details?.workPlace}`
          : details?.job && !details?.workplace
          ? `Works as ${details?.job}`
          : details?.workPlace && !details?.job && `Works at ${details?.workPlace}`,

      icon: iconsBaseUrl + 'job.png',
      value: details?.job || details?.workPlace,
    },
    {
      queryValue: 'work_and_edu',
      topic: 'Work',
      multiPossible: true,
      name: 'job',
      icon: iconsBaseUrl + 'job.png',
      value: details?.job,
      lowerCaseAndSpace: 'job',
    },
    {
      queryValue: 'work_and_edu',
      topic: 'Work',
      multiPossible: true,
      name: 'workPlace',
      icon: iconsBaseUrl + 'job.png',
      value: details?.workPlace,
      lowerCaseAndSpace: 'workplace',
    },

    {
      queryValue: 'work_and_edu',
      topic: 'Education',
      multiPossible: true,
      name: 'college',
      introText: `Studied at ${details?.college}`,
      icon: iconsBaseUrl + 'studies.png',
      value: details?.college,
      lowerCaseAndSpace: 'college',
    },
    {
      queryValue: 'work_and_edu',
      topic: 'Education',
      multiPossible: true,
      name: 'highSchool',
      introText: `Studied at ${details?.highSchool}`,
      icon: iconsBaseUrl + 'studies.png',
      value: details?.highSchool,
      lowerCaseAndSpace: 'high school',
    },
    {
      queryValue: 'places',
      topic: 'Current city',
      name: 'currentCity',
      introText: `Lives in ${details?.currentCity}`,
      icon: iconsBaseUrl + 'home.png',
      value: details?.currentCity,
      lowerCaseAndSpace: 'current city',
    },
    {
      queryValue: 'places',
      topic: 'Hometown',
      name: 'hometown',
      introText: `From ${details?.hometown}`,
      icon: iconsBaseUrl + 'from.png',
      value: details?.hometown,
      lowerCaseAndSpace: 'hometown',
    },
    {
      queryValue: 'family_and_relationships',
      topic: 'Relationship',
      name: 'relationship',
      introText: details?.relationshipStatus,
      icon: iconsBaseUrl + 'relationship.png',
      value: details?.relationshipStatus,
      lowerCaseAndSpace: 'relationship',
    },
    {
      queryValue: 'social_media',
      topic: 'Social Media',
      name: 'instagram',
      introText: (
        <a
          href={`https://www.instagram.com/${details?.instagram}`}
          target='_blank'
          rel='noreferrer'>
          {details?.instagram}
        </a>
      ),
      // introText: 'akajkjaa',
      icon: iconsBaseUrl + 'instagram.png',
      value: details?.instagram,
      lowerCaseAndSpace: 'instagram',
    },
  ];

  const handleChange = e => {
    const { name, value, checked } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    setRemainingChar(100 - e.target.value.length);
  };

  const [updateUserDetails, { isLoading, isSuccess, error }] = useUpdateUserDetailsMutation();

  const handleSubmitDetails = async () => {
    const postData = updatedDetails;
    const { data } = await updateUserDetails({
      postData,
      userId: profileUser.id,
      field: 'details',
    });
    const { userData, message } = data;
    dispatch(updateUser(userData));
    setShowUpdateBio(false);
  };

  return (
    <div className='card_main intro'>
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
          handleSubmitDetails={handleSubmitDetails}
          setUpdatedDetails={setUpdatedDetails}
          remainingChar={remainingChar}
          handleChange={handleChange}
        />
      )}

      {detailsArray.map(
        detail =>
          detail.value &&
          detail.introText && (
            <div key={detail.name} className='detail_row'>
              <img src={detail.icon} alt='' />
              <span>{detail.introText}</span>
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
          updateDetails={handleSubmitDetails}
          visible={showEditDetailsModal}
          setVisible={setShowEditDetailsModal}
        />
      )}

      {!visitor && <button className='btn gray_btn hover1 '>Add Hobbies</button>}
      {!visitor && <button className='btn gray_btn hover1 '>Add Features</button>}
    </div>
  );
};
