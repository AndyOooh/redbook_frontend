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
import { useGetUserDetailsQuery } from 'features/users/usersApiSlice';
import { isObject } from 'utils/isObject';

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

  const handleShowInput = detailName => {
    showDetailInput === '' ? setShowDetailInput(detailName) : reset();
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async (e, path) => {
    e.preventDefault();
    console.log('🚀 ~ file: About.jsx ~ line 48 ~ handleSubmit ~ path', path);

    const postData = updatedDetails;
    try {
      const data = await updateUserDetails({
        postData,
        userId: profileUser.id,
        path: 'details.' + path, // here we nned to add path
      }).unwrap();
      const { userData, message } = data;
      // ååå
      dispatch(updateUser({ details: { ...userData } }));
      reset();
    } catch (error) {
      console.log('🚀 ~ file: About.jsx ~ line 52 ~ error', error);
    }
  };

  const { details } = useContext(ProfileContext).profileUser;
  console.log('🚀 ~ file: About2.jsx ~ line 6 ~ details', details);

  const overView = {
    title: 'Overview',
    snakeCase: 'overview',
    // subItems: [
    //   {
    //     name: 'Test',
    //     dbName: 'test',
    //     value: 'test',
    //     iconSrc: iconsBaseUrl + 'job.png',
    //   },
    // ],
    // subItems:  Object.entries(details).filter(([key, value]) => ['', ''].includes(key)).map(([key, value]) => {
    subItems:  Object.entries(details).map(([key, value]) => {
      return 'flat array, then create object like the rest each entry'
  }),
}

  let detailsArray = [overView];
  Object.entries(details).forEach(([key, value]) => {
    const createMissingText = string => `No ${string} to show`;
    const getSubItemTextAndIcon = val => {
      return {
        workPlace: {
          text: val ? `Works at ${val}` : createMissingText('workplace info'),
          icon: iconsBaseUrl + 'job.png',
        },
        job: {
          text: val ? `Works as ${val}` : createMissingText('job info'),
          icon: iconsBaseUrl + 'job.png',
        },
        college: {
          text: val ? `Went to ${val}` : createMissingText('college'),
          icon: iconsBaseUrl + 'studies.png',
        },
        highSchool: {
          text: val ? `Went to ${val}` : createMissingText('high school'),
          icon: iconsBaseUrl + 'studies.png',
        },
        currentCity: {
          text: val ? `Lives in ${val}` : createMissingText('current city'),
          icon: iconsBaseUrl + 'home.png',
        },
        hometown: {
          text: val ? `From ${val}` : createMissingText('hometown info'),
          icon: iconsBaseUrl + 'from.png',
        },
        relationshipStatus: {
          text: val ? val : createMissingText('relationship info'),
          icon: iconsBaseUrl + 'relationship.png',
        },
        familyMembers: {
          text: val ? val : createMissingText('family members'),
          icon: iconsBaseUrl + 'relationship.png',
        },
        instagram: {
          text: val ? val : createMissingText('instagram'),
          icon: iconsBaseUrl + 'instagram.png',
        },
      };
    };

    detailsArray.push({
      dbName: key,
      title: camelToLetterCase(key),
      snakeCase: camelToSnakeCase(key),
      subItems: Object.entries(value).map(([key, value]) => {
        if (isObject(value)) {
          return {
            subTitle: camelToLetterCase(key),
            nestedItems: Object.entries(value).map(([nestedKey, nestedValue]) => {
              return {
                name: camelToLetterCase(nestedKey),
                dbName: nestedKey,
                value: nestedValue,
                iconSrc: getSubItemTextAndIcon(nestedValue)[nestedKey].icon,
                text: getSubItemTextAndIcon(nestedValue)[nestedKey].text,
              };
            }),
          };
        } else {
          return {
            name: camelToLetterCase(key),
            dbName: key,
            value: value,
            iconSrc: getSubItemTextAndIcon(value)[key]?.icon,
            text: getSubItemTextAndIcon(value)[key]?.text,
          };
        }
      }),
    });
  });

  console.log('🚀 ~ file: About2.jsx ~ line 10 ~ detailsArray', detailsArray);

  // let currentCategory; // move to iterator in jsx?
  let currentCategory = detailsArray.find(item => item.snakeCase === section)?.dbName;
  return (
    <>
      <section className='card_main about'>
        <div className='about_nav'>
          <h2>About</h2>
          {detailsArray.map(category => (
            <NavLink
              key={category.title}
              to={`?section=${category.snakeCase}`}
              onClick={() => reset()}
              className={section === category.snakeCase ? 'menu_link active_link ' : 'menu_link'}>
              {category.title}
            </NavLink>
          ))}
        </div>

        <div className='about_content'>
          {detailsArray
            .filter(category => {
              return section ? category.snakeCase === section : category.snakeCase === 'overview';
            })[0] //start iterating over one category. the one which matches current section.
            .subItems.map(
              subItem =>
                visitor ? ( // --------------------- visitor --------------------------------
                  !subItem.value || !subItem.nestedItems ? (
                    <React.Fragment key={subItem.value}>
                      <div className='content_item'>
                        <h4>{subItem.name}</h4>
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <img src={subItem.iconSrc} alt='' />
                            <p>{subItem.text}</p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    // nestedItems
                    <React.Fragment key={subItem.name}>
                      <h3>{subItem.subTitle}</h3>
                      {subItem.nestedItems.map(nestedItem => (
                        <div key={nestedItem.name} className='content_item'>
                          <h4>{nestedItem.name}</h4>
                          <div className='subItem_row'>
                            <div className='subItem_left'>
                              <img src={nestedItem.iconSrc} alt='' />
                              <p>{nestedItem.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  )
                ) : // -------------------------------- !visitor --------------------------------
                !subItem.value && !subItem.nestedItems ? (
                  <React.Fragment key={subItem.name}>
                    <div key={subItem.name} className='content_item'>
                      <h4>{subItem.name}</h4>
                      <div className='add_row' onClick={() => handleShowInput(subItem.dbName)}>
                        <BsFillPlusCircleFill /> Add {subItem.name}
                      </div>
                    </div>
                    {showDetailInput === subItem.dbName && (
                      <DetailInput
                        name={subItem.dbName}
                        value={updatedDetails[subItem.dbName]}
                        changeHandler={handleChange}
                        cancelHandler={reset}
                        saveHandler={handleSubmit}
                        path={currentCategory + '.' + subItem.dbName}
                        disabled={updatedDetails[subItem.dbName] === ''}
                        subTitle={subItem.name}
                      />
                    )}
                  </React.Fragment>
                ) : !subItem.nestedItems ? (
                  // !nestedItems
                  <div key={subItem.name} className='content_item'>
                    <h4>{subItem.name}</h4>
                    <div className='subItem_row'>
                      <div className='subItem_left'>
                        <img src={subItem.iconSrc} alt='' />
                        <p>{subItem.text}</p>
                      </div>
                      <div className='subItem_right'>
                        <BsPeopleFill />
                        <MdModeEditOutline onClick={() => handleShowInput(subItem.dbName)} />
                      </div>
                    </div>
                  </div>
                ) : (
                  // nestedItems
                  <React.Fragment key={subItem.subTitle}>
                    <h3 key={subItem.subTitle}>{subItem.subTitle}</h3>
                    {subItem.nestedItems.map(nestedItem => (
                      <React.Fragment key={nestedItem.name}>
                        <div className='content_item'>
                          <h4>{nestedItem.name}</h4>
                          {!nestedItem.value || nestedItem.value.length === 0 ? (
                            <div
                              className='add_row'
                              onClick={() => handleShowInput(nestedItem.dbName)}>
                              <BsFillPlusCircleFill /> Add {nestedItem.noun || nestedItem.name}
                            </div>
                          ) : (
                            <div className='subItem_row'>
                              <div className='subItem_left'>
                                <img src={nestedItem.iconSrc} alt='' />
                                <p>{nestedItem.text}</p>
                              </div>
                              <div className='subItem_right'>
                                <BsPeopleFill />
                                <MdModeEditOutline
                                  onClick={() => handleShowInput(nestedItem.dbName)}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {showDetailInput === nestedItem.dbName && (
                          <DetailInput
                            name={nestedItem.dbName}
                            value={updatedDetails[nestedItem.dbName]}
                            changeHandler={handleChange}
                            cancelHandler={reset}
                            saveHandler={handleSubmit}
                            path={'test' + nestedItem.dbName}
                            disabled={updatedDetails[nestedItem.dbName] === ''}
                            subTitle={nestedItem.name}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )
              // <h1>testttttttt</h1>
            )}
        </div>
      </section>
    </>
  );
};
