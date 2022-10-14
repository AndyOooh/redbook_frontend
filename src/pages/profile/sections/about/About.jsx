import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { BsFillPlusCircleFill, BsPeopleFill, BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

import { useUpdateUserDetailsMutation } from 'features/users/usersApiSlice';
import { updateUser } from 'features/auth/authSlice';
import { DetailInput } from './DetailInput';

import './About.scss';

export const About = props => {
  const { user, visitor } = props;
  const dispatch = useDispatch();
  const [showDetailInput, setShowDetailInput] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');
  const [updateUserDetails, { isLoading, isSuccess, error }] = useUpdateUserDetailsMutation();

  const iconsBaseUrl = '../../../../../icons/';
  console.log('🚀 ~ file: About.jsx ~ line 15 ~ updatedDetails', updatedDetails);

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
    console.log('🚀 ~ file: About.jsx ~ line 23 ~ name', name);
    console.log('🚀 ~ file: About.jsx ~ line 23 ~ value', value);
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submit clicked');
    const postData = updatedDetails;
    console.log('🚀 ~ file: About.jsx ~ line 36 ~ postData', postData);
    try {
      const data = await updateUserDetails({
        postData,
        userId: user.id,
        field: 'details',
      }).unwrap();
      console.log('🚀 ~ file: About.jsx ~ line 38 ~ data', data);
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
          text: `Works as ${user?.details.job} at ${user.details.workPlace}`,
          mongoName: 'work_and_edu',
        },
        {
          subTitle: 'College',
          noun: 'college',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${user?.details.college}`,
          mongoName: 'college',
        },
        {
          subTitle: 'High School',
          noun: 'high school',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${user?.details.highSchool}`,
          mongoName: 'highSchool',
        },
        {
          subTitle: 'Current city',
          noun: 'current city',
          iconSrc: iconsBaseUrl + 'home.png',
          text: user?.details.currentCity,
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
          text: `Works as ${user?.details.job} at ${user.details.workPlace}`,
          mongoName: 'workPlace',
        },
        {
          subTitle: 'College',
          noun: 'college',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${user?.details.college}`,
          mongoName: 'college',
        },
        {
          subTitle: 'High School',
          noun: 'high school',
          iconSrc: iconsBaseUrl + 'studies.png',
          text: `Went to ${user?.details.highSchool}`,
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
          text: `Lives in ${user?.details.currentCity}`,
          mongoName: 'currentCity',
        },
        {
          subTitle: 'Hometown',
          noun: 'hometown',
          iconSrc: iconsBaseUrl + 'home.png',
          text: `From ${user?.details.hometown}`,
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
          text: `${user?.details.relationshipStatus}`,
          mongoName: 'relationshipStatus',
        },
        {
          subTitle: 'Family members',
          noun: 'family member',
          iconSrc: iconsBaseUrl + 'relationship.png',
          // text: `From ${user?.details.hometown}`,
          array: user.details.familyMembers,
          // mongoName: 'relationshipStatus', // Not in DB yet
        },
      ],
    },
  ];

  return (
    <>
      <section className='card_main about'>
        <div className='about_nav'>
          <h2>About</h2>
          {menuData.map(item => {
            return (
              <NavLink
                to={`?section=${item.queryValue}`}
                onClick={() => reset()}
                className={section === item.queryValue ? 'menu_link active_link ' : 'menu_link'}
                key={item.title}>
                {item.title}
              </NavLink>
            );
          })}
        </div>
        {/* <div className="vert_line"></div> // how do make it 100% height of parent. Seems impossible, unless give parent a mesureabke height */}
        <div className='about_content'>
          {visitor
            ? menuData
                .filter(item =>
                  section ? item.queryValue === section : item.queryValue === 'overview'
                )[0]
                .subItems.map(subItem => {
                  return (
                    <React.Fragment key={subItem.subTitle}>
                      <div className='content_item'>
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <img src={subItem.iconSrc} alt='' />
                            <p>{subItem.text}</p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
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
                        {(subItem.array || !user.details[subItem.mongoName]) && (
                          <div
                            className='add_row'
                            onClick={() => handleShowInput(subItem.mongoName)}>
                            <BsFillPlusCircleFill /> Add {subItem.noun || subItem.subTitle}
                          </div>
                        )}
                        {user.details[subItem.mongoName] && (
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
      </section>
    </>
  );
};
