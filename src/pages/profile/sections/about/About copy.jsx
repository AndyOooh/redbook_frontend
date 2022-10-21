import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { BsFillPlusCircleFill, BsPeopleFill } from 'react-icons/bs';
import { MdKeyboardArrowUp, MdModeEditOutline } from 'react-icons/md';

import './About.scss';
import { useUpdateUserDetailsMutation } from 'features/users/usersApiSlice';
import { updateUser } from 'features/auth/authSlice';
import { DetailInput } from './DetailInput';
import { useContext } from 'react';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { About2 } from './About2';
import { camelToLetterCase, camelToSnakeCase } from 'utils/stringHelpers';

export const About = () => {
  const { profileUser, visitor } = useContext(ProfileContext);

  const dispatch = useDispatch();
  const [showDetailInput, setShowDetailInput] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({});
  const searchParams = useSearchParams()[0];
  const section = searchParams.get('section');
  const [updateUserDetails, { isLoading, isSuccess, error }] = useUpdateUserDetailsMutation();

  const iconsBaseUrl = '../../../../../icons/';

  const reset = () => {
    setShowDetailInput('');
    setUpdatedDetails({});
  };

  const handleShowInput = name => {
    showDetailInput === '' ? setShowDetailInput(name) : reset();
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const postData = updatedDetails;
    try {
      const data = await updateUserDetails({
        postData,
        userId: profileUser.id,
        field: 'details',
      }).unwrap();
      const { userData, message } = data;
      dispatch(updateUser({ details: { ...userData } }));
      reset();
    } catch (error) {
      console.log('🚀 ~ file: About.jsx ~ line 52 ~ error', error);
    }
  };

  const menuData = [
    {
      title: 'Overview',
      queryValue: 'overview',
      subItems: [
        {
          subTitle: 'Work',
          noun: 'workplace',
          iconSrc: iconsBaseUrl + 'job.png',
          text: `Works as ${profileUser?.details.job} at ${profileUser.details.workPlace}`,
          mongoName: 'work_and_edu',
        },
        {
          subTitle: 'College',
          noun: 'college',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${profileUser?.details.college}`,
          mongoName: 'college',
        },
        {
          subTitle: 'High School',
          noun: 'high school',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${profileUser?.details.highSchool}`,
          mongoName: 'highSchool',
        },
        {
          subTitle: 'Current city',
          noun: 'current city',
          iconSrc: iconsBaseUrl + 'home.png',
          text: profileUser?.details.currentCity,
          mongoName: 'currentCity',
        },
      ],
    },
    {
      title: 'Work and education',
      queryValue: 'work_and_edu',
      subItems: [
        {
          subTitle: 'Work',
          noun: 'workplace',
          iconSrc: iconsBaseUrl + 'job.png',
          text: `Works as ${profileUser?.details.job} at ${profileUser.details.workPlace}`,
          mongoName: 'workPlace',
        },
        {
          subTitle: 'College',
          noun: 'college',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${profileUser?.details.college}`,
          mongoName: 'college',
        },
        {
          subTitle: 'High School',
          noun: 'high school',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${profileUser?.details.highSchool}`,
          mongoName: 'highSchool',
        },
      ],
    },
    {
      title: 'Places lived',
      queryValue: 'places',
      subItems: [
        {
          subTitle: 'Current City',
          noun: 'city',
          iconSrc: iconsBaseUrl + 'home.png',
          text: `Lives in ${profileUser?.details.currentCity}`,
          mongoName: 'currentCity',
        },
        {
          subTitle: 'Hometown',
          noun: 'hometown',
          iconSrc: iconsBaseUrl + 'from.png',
          text: `From ${profileUser?.details.hometown}`,
          mongoName: 'hometown',
        },
      ],
    },
    {
      title: 'Family and relationships',
      queryValue: 'family_and_relationships',
      subItems: [
        {
          subTitle: 'Relationship',
          noun: 'relationship status',
          iconSrc: iconsBaseUrl + 'relationship.png',
          text: `${profileUser?.details.relationshipStatus}`,
          mongoName: 'relationshipStatus',
        },
        {
          subTitle: 'Family members',
          noun: 'family member',
          iconSrc: iconsBaseUrl + 'relationship.png',
          // text: `From ${user?.details.hometown}`,
          array: profileUser.details.familyMembers,
          // mongoName: 'relationshipStatus', // Not in DB yet
        },
      ],
    },
    {
      title: 'Social media',
      queryValue: 'social_media',
      subItems: [
        {
          subTitle: 'Instagram',
          noun: 'instagram',
          iconSrc: iconsBaseUrl + 'instagram.png',
          text: (
            <a
              href={`https://www.instagram.com/${profileUser?.details.instagram}`}
              target='_blank'
              rel='noreferrer'>
              {`@${profileUser?.details.instagram}`}
            </a>
          ),
          mongoName: 'instagram',
        },
      ],
    },
  ];

  const overView = {
    menuText: 'Overview',
    snake_case: 'overview',
    value: [
      {
        subTitle: 'Work',
        noun: 'workplace',
        iconSrc: iconsBaseUrl + 'job.png',
        text: `Works as ${profileUser?.details.job} at ${profileUser.details.workPlace}`,
        mongoName: 'work_and_edu',
      },
      {
        subTitle: 'College',
        noun: 'college',
        iconSrc: iconsBaseUrl + 'studies.png',
        text: `Went to ${profileUser?.details.college}`,
        mongoName: 'college',
      },
      {
        subTitle: 'High School',
        noun: 'high school',
        iconSrc: iconsBaseUrl + 'studies.png',
        text: `Went to ${profileUser?.details.highSchool}`,
        mongoName: 'highSchool',
      },
      {
        subTitle: 'Current city',
        noun: 'current city',
        iconSrc: iconsBaseUrl + 'home.png',
        text: profileUser?.details.currentCity,
        mongoName: 'currentCity',
      },
    ],
  };

 

  const { details } = useContext(ProfileContext).profileUser;
  console.log('🚀 ~ file: About2.jsx ~ line 6 ~ details', details);

  let detailsArray = [];
  Object.entries(details).forEach(([key, value]) => {
    detailsArray.push({
      // category: key,
      menuText: camelToLetterCase(key),
      snake_case: camelToSnakeCase(key),
      value,
    });
  });
  console.log('🚀 ~ file: About2.jsx ~ line 10 ~ detailsArray', detailsArray);

  // detailsArray.shift(overView);

  return (
    <>
      <section className='card_main about'>
        <div className='about_nav'>
          <h2>About</h2>
          {detailsArray.map(detail => {
            return (
              <NavLink
                key={detail.menuText}
                to={`?section=${detail.snake_case}`}
                onClick={() => reset()}
                className={section === detail.snake_case ? 'menu_link active_link ' : 'menu_link'}>
                {detail.menuText}
              </NavLink>
            );
          })}
        </div>
        <div className='about_content'>
          {visitor
            ? menuData
                .filter(item =>
                  section ? item.queryValue === section : item.queryValue === 'overview'
                )[0]
                .subItems.map(subItem => {
                  return (
                    <>
                      <div key={subItem.subTitle} className='content_item'>
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <img src={subItem.iconSrc} alt='' />
                            <p>{subItem.text}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
            : menuData
                .filter(item =>
                  section ? item.queryValue === section : item.queryValue === 'overview'
                )[0]
                .subItems.map(subItem => {
                  return (
                    <React.Fragment key={subItem.subTitle}>
                      <div className='content_item'>
                        <h4>{subItem.subTitle}</h4>
                        {(subItem.array || !profileUser.details[subItem.mongoName]) && (
                          <div
                            className='add_row'
                            onClick={() => handleShowInput(subItem.mongoName)}>
                            <BsFillPlusCircleFill /> Add {subItem.noun || subItem.subTitle}
                          </div>
                        )}
                        {profileUser.details[subItem.mongoName] && (
                          <div className='subItem_row'>
                            <div className='subItem_left'>
                              <img src={subItem.iconSrc} alt='' />
                              <p>{subItem.text}</p>
                            </div>
                            <div className='subItem_right'>
                              <BsPeopleFill />
                              <MdModeEditOutline
                                onClick={() => handleShowInput(subItem.mongoName)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {showDetailInput === subItem.mongoName && (
                        <DetailInput
                          name={subItem.mongoName}
                          value={updatedDetails[subItem.mongoName]}
                          changeHandler={handleChange}
                          cancelHandler={reset}
                          saveHandler={handleSubmit}
                          disabled={updatedDetails[subItem.mongoName] === ''}
                          subTitle={subItem.subTitle}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
        </div>
        {/* <About2 /> */}
      </section>
    </>
  );
};
