import React, { useState } from 'react';
import { UpdateBio } from './UpdateBio';

export const Intro = ({ details, visitor }) => {
  console.log('🚀 ~ file: Intro.jsx ~ line 4 ~ details', details);
  console.log('🚀 ~ file: Intro.jsx ~ line 4 ~ vistitor', visitor);

  const [showUpdateBio, setShowUpdateBio] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(details);
  const [remainingChar, setRemainingChar] = useState(
    updatedDetails?.bio ? 100 - updatedDetails?.bio.length : 100
  );

  const iconsBaseUrl = '../../../../../icons/';

  const detailsArray = [
    {
      name: 'job',
      text:
        details?.job && details?.workplace
          ? `Works as ${details?.job} at {details?.workplace}`
          : details?.job && !details?.workplace
          ? `Works as {details?.job}`
          : details?.workplace && !details?.job && `Works at {details?.workplace}`,
      icon: 'assets/icons/job.png',
    },

    { name: 'relationship', text: details.relationship, icon: iconsBaseUrl + 'relationship.png' },
    {
      name: 'college',
      text: `Studied at ${details?.college}`,
      icon: iconsBaseUrl + 'studies.png',
    },
    {
      name: 'highSchool',
      text: `Studied at ${details?.highSchool}`,
      icon: iconsBaseUrl + 'studies.png',
    },
    {
      name: 'currentCity',
      text: `Lives in ${details?.currentCity}`,
      icon: iconsBaseUrl + 'home.png',
    },
    { name: 'homeTown', text: `From ${details?.hometown}`, icon: iconsBaseUrl + 'home.png' },

    {
      name: 'instagram',
      text: (
        <a
          href={`https://www.instagram.com/${details?.instagram}`}
          target='_blank'
          rel='noreferrer'>
          {details?.instagram}
        </a>
      ),
      icon: iconsBaseUrl + 'instagram.png',
    },
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
    setRemainingChar(100 - e.target.value.length);
  };

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
          updatedDetails={updatedDetails}
          setUpdatedDetails={setUpdatedDetails}
          remainingChar={remainingChar}
          handleChange={handleChange}

          //   infos={infos}
          //   max={max}
          //   setVisible={setShowUpdateBio}
          //   updateDetails={updateDetails}
          //   placeholder="Add Bio"
          //   name="bio"
        />
      )}

      {detailsArray.map((detail, index) => (
        <div key={detail.name} className='detail_row'>
          <img src={detail.icon} alt='' />
          <span>{detail.text}</span>
        </div>
      ))}
    </>
  );
};
