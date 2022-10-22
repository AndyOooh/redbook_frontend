import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { BsFillPlusCircleFill, BsPeopleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

import './About.scss';
import { useUpdateUserMutation } from 'features/users/usersApiSlice';
import { updateUserStore } from 'features/auth/authSlice';
import { DetailInput } from './DetailInput';
import { useContext } from 'react';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';

export const About = () => {
  const { profileUser, visitor } = useContext(ProfileContext);

  const dispatch = useDispatch();
  const [showDetailInput, setShowDetailInput] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({});
  console.log('🚀 ~ file: About.jsx ~ line 23 ~ updatedDetails', updatedDetails);
  const searchParams = useSearchParams()[0];
  const section = searchParams.get('section');
  console.log('🚀 ~ file: About.jsx ~ line 24 ~ section', section);
  const [updateUser, {}] = useUpdateUserMutation();

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

  const handleUpdateDetails = async (e, path) => {
    e.preventDefault();
    const postData = updatedDetails;
    try {
      const data = await updateUser({
        postData,
        userId: profileUser.id,
        path: 'details.' + path,
      }).unwrap();
      const { userData, message } = data;
      dispatch(updateUserStore({ details: { ...userData } }));
      reset();
    } catch (error) {
      console.log('🚀 ~ file: About.jsx ~ line 52 ~ error', error);
    }
  };

  const { detailsArray } = useContext(ProfileContext);

  let currentCategory = detailsArray?.find(item => item.snakeCase === section)?.dbName;
  return !detailsArray ? null : ( // <DotLoader color='var(--red-main)' size={'10rem'} className='dotLoader' /> seems redundant. it's set from /profile already
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
                        saveHandler={handleUpdateDetails}
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
                        <div onClick={() => handleShowInput(subItem.dbName)}>
                          <MdModeEditOutline />
                        </div>
                      </div>
                    </div>
                    {showDetailInput === subItem.dbName && (
                      <DetailInput
                        name={subItem.dbName}
                        value={updatedDetails[subItem.dbName]}
                        changeHandler={handleChange}
                        cancelHandler={reset}
                        saveHandler={handleUpdateDetails}
                        path={currentCategory + '.' + subItem.dbName}
                        disabled={updatedDetails[subItem.dbName] === ''}
                        subTitle={subItem.name}
                      />
                    )}
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
                            saveHandler={handleUpdateDetails}
                            path={'test' + nestedItem.dbName}
                            disabled={updatedDetails[nestedItem.dbName] === ''}
                            subTitle={nestedItem.name}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )
            )}
        </div>
      </section>
    </>
  );
};
