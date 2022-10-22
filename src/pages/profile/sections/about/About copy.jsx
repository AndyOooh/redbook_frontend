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
import { isObject } from 'formik';

export const About = () => {
  const { profileUser, visitor } = useContext(ProfileContext);

  const dispatch = useDispatch();
  const [showDetailInput, setShowDetailInput] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({});
  const searchParams = useSearchParams()[0];
  const section = searchParams.get('section');
  console.log('🚀 ~ file: About.jsx ~ line 24 ~ section', section);
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

  const { details } = useContext(ProfileContext).profileUser;
  console.log('🚀 ~ file: About2.jsx ~ line 6 ~ details', details);

  const overView = {
    title: 'Overview',
    snakeCase: 'overview',
    subItems: [
      {
        name: 'Test',
        value: 'test',
        iconSrc: iconsBaseUrl + 'job.png',
      },
    ],
  };

  let detailsArray = [overView];
  Object.entries(details).forEach(([key, value]) => {
    const subItemTextObject = val => {
      return {
        // work: `Works as ${details.job} at details.workPlace}`,
        work: val ? 'dadasdasd' : null,
        college: val ? `Went to ${val}` : null,
        highSchool: val ? `Went to ${val}` : null,
        // currentCity: profileUser?.details.currentCity
        currentCity: val ? `Lives in ${val}` : null,
        hometown: val ? `From ${val}` : null,
        // relationshipStatus: `${profileUser?.details.relationshipStatus}`,
        relationshipStatus: val ? val : null,
      };
    };

    detailsArray.push({
      title: camelToLetterCase(key),
      snakeCase: camelToSnakeCase(key),
      subItems: Object.entries(value).map(([key, value]) => {
        if (isObject(value)) {
          return {
            subTitle: camelToLetterCase(key),
            subItems: Object.entries(value).map(([key, value]) => {
              return {
                name: camelToLetterCase(key),
                value: value,
                iconSrc: iconsBaseUrl + 'home.png',
                text: subItemTextObject(value)[key],
              };
            }),
          };
        } else {
          return {
            name: camelToLetterCase(key),
            value: value,
            iconSrc: iconsBaseUrl + 'home.png',
            text: subItemTextObject(value)[key],
          };
        }
      }),
    });
  });

  console.log('🚀 ~ file: About2.jsx ~ line 10 ~ detailsArray', detailsArray);

  return (
    <>
      <section className='card_main about'>
        <div className='about_nav'>
          <h2>About</h2>
          {detailsArray.map(category => {
            return (
              <NavLink
                key={category.title}
                to={`?section=${category.snakeCase}`}
                onClick={() => reset()}
                className={section === category.snakeCase ? 'menu_link active_link ' : 'menu_link'}>
                {category.title}
              </NavLink>
            );
          })}
        </div>

        <div className='about_content'>
          {visitor ? // Visitor
              detailsArray
                .filter(category =>
                  section ? category.snakeCase === section : category.snakeCase === 'overview'
                )[0]
                .subItems.map(subItem =>
                  // trying to make sure no entry /(with icon) is amde when we have no value. this is currently not wokring. wHen it does, it should also be pomopleneted forter down.
                  !subItem.value ? null : !subItem.subItems ? (
                    <React.Fragment key={subItem.name}>
                      <div className='content_item'>
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <h1>doenst have subItems</h1>
                            <img src={subItem.iconSrc} alt='' />
                            <p>{subItem.text}</p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    subItem.subItems.map(subItem => (
                      <React.Fragment key={subItem.name}>
                        <div className='content_item'>
                          <div className='subItem_row'>
                            <div className='subItem_left'>
                              <h1>Has subItems</h1>
                              <img src={subItem.iconSrc} alt='' />
                              <p>{subItem.text}</p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                  )
                )
            : // Not visitor
              detailsArray
                .filter(category =>
                  section ? category.snakeCase === section : category.snakeCase === 'overview'
                )[0]
                .subItems.map(subItem => {
                  // differs her  ut shouldnt
                  return (
                    <React.Fragment key={subItem.name}>
                      <div className='content_item'>
                        <h4>{subItem.name}</h4>
                        {/* check if we have value */}
                        {!subItem.value || subItem.value.length === 0 ? (
                          <div
                            className='add_row'
                            onClick={() => handleShowInput(subItem.mongoName)}>
                            <BsFillPlusCircleFill /> Add {subItem.noun || subItem.name}
                          </div>
                        ) : (
                          <>
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
                          </>
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
                          subTitle={subItem.name}
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
