import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { BsFillPlusCircleFill, BsPeopleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

import './About.scss';
import { useUpdateUserMutation } from 'features/users/usersApiSlice';
import { updateUserStore } from 'features/auth/authSlice';
import { useContext } from 'react';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { isEmptyValue } from 'utils/isEmptyValue';
import { DetailInput } from 'pages/profile/DetailInput/DetailInput';

export const About = () => {
  const dispatch = useDispatch();
  const {
    profileUser,
    visitor,
    detailsArray,
    updatedDetails,
    setUpdatedDetails,
    resetDetails,
    showDetailInput,
    handleShowDetailsInput,
  } = useContext(ProfileContext);

  const searchParams = useSearchParams()[0];
  const section = searchParams.get('section');
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleUpdateDetails = async (e, path) => {
    e.preventDefault();
    const payload = updatedDetails;
    try {
      const data = await updateUser({
        payload,
        userId: profileUser.id,
        path: 'details.' + path,
      }).unwrap();
      const { userData, message } = data;
      dispatch(updateUserStore({ details: { ...userData } }));
      resetDetails();
    } catch (error) {
      console.log('🚀 ~ file: About.jsx ~ line 52 ~ error', error);
    }
  };

let currentCategory = detailsArray?.find(item => item.snakeCase === section)?.dbName || 'overview';

  const currentSubcategory = useCallback(
    dbField => {
      if (!detailsArray) return;
      let pathArray = [currentCategory];

      const check = detailsArray?.find(detail => detail.dbName === currentCategory);

      check.subItems.forEach(subItem => {
        if (subItem.dbName === dbField) {
          pathArray.push(dbField);
          return;
        } else if (subItem.nestedItems) {
          subItem.nestedItems.some(nestedItem => nestedItem.dbName === dbField) &&
            pathArray.push(subItem.dbName, dbField);
        } else return null;
      });
      return pathArray.length > 1 ? pathArray.join('.') : null;
    },
    [detailsArray, currentCategory]
  );

  return !detailsArray ? null : ( // <DotLoader color='var(--red-main)' size={'10rem'} className='dotLoader' /> seems redundant. it's set from /profile already
    <>
      <section className='card_main about'>
        <div className='about_nav'>
          <h2>About</h2>
          {detailsArray.map(category => (
            <NavLink
              key={category.title}
              to={`?section=${category.snakeCase}`}
              onClick={() => resetDetails()}
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
            .subItems.map(subItem =>
              visitor ? ( // --------------------- visitor --------------------------------
                isEmptyValue(subItem.value) && !subItem.nestedItems ? ( // Not nested, no value
                  <div key={subItem.name} className='content_subitem'>
                    {currentCategory !== 'overview' && <h4>{subItem.name}</h4>}
                    <div className='subItem_row'>
                      <div className='subItem_left'>
                        <img src={subItem.iconSrc} alt='' />
                        <p>{subItem.text}</p>
                      </div>
                    </div>
                  </div>
                ) : !subItem.nestedItems ? (
                  // !nestedItems
                  <div key={subItem.name} className='content_subitem'>
                    {currentCategory !== 'overview' && <h4>{subItem.name}</h4>}
                    <div className='subItem_row'>
                      <div className='subItem_left'>
                        <img src={subItem.iconSrc} alt='' />
                        <p>{subItem.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // nestedItems
                  <div key={subItem.name + 'i'} className='content_item'>
                    {currentCategory !== 'overview' && <h3>{subItem.subTitle}</h3>}
                    {subItem.nestedItems.map(nestedItem => (
                      <div key={nestedItem.value} className='content_subitem'>
                        {currentCategory !== 'overview' && <h4>{nestedItem.name}</h4>}
                        <div className='subItem_row'>
                          <div className='subItem_left'>
                            <img src={nestedItem.iconSrc} alt='' />
                            <p>{nestedItem.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : // -------------------------------- !visitor --------------------------------
              isEmptyValue(subItem.value) && !subItem.nestedItems ? (
                <React.Fragment key={subItem.name}>
                  <div key={subItem.name} className='content_subitem'>
                    {currentCategory !== 'overview' && <h4>{subItem.name}</h4>}
                    <div className='add_row' onClick={() => handleShowDetailsInput(subItem.dbName)}>
                      <BsFillPlusCircleFill /> Add {subItem.name}
                    </div>
                  </div>
                  {showDetailInput === subItem.dbName && (
                    <DetailInput
                      name={subItem.dbName}
                      value={updatedDetails[subItem.dbName]}
                      defaulValue={subItem.value} //doesn't work here but works in Intro for bio. why?
                      changeHandler={handleChange}
                      cancelHandler={resetDetails}
                      saveHandler={handleUpdateDetails}
                      // path={currentCategory + '.' + subItem.dbName}
                      path={currentSubcategory(subItem.dbName)}
                      disabled={updatedDetails[subItem.dbName] === ''}
                      subTitle={subItem.name}
                    />
                  )}
                </React.Fragment>
              ) : !subItem.nestedItems ? (
                // !nestedItems
                <div key={subItem.name} className='content_subitem'>
                  {currentCategory !== 'overview' && <h4>{subItem.name}</h4>}
                  <div className='subItem_row'>
                    <div className='subItem_left'>
                      <img src={subItem.iconSrc} alt='' />
                      <p>{subItem.text}</p>
                    </div>
                    <div className='subItem_right'>
                      <BsPeopleFill />
                      <div onClick={() => handleShowDetailsInput(subItem.dbName)}>
                        <MdModeEditOutline />
                      </div>
                    </div>
                  </div>
                  {showDetailInput === subItem.dbName && (
                    <DetailInput
                      name={subItem.dbName}
                      value={updatedDetails[subItem.dbName]}
                      defaultValue={subItem.value}
                      changeHandler={handleChange}
                      cancelHandler={resetDetails}
                      saveHandler={handleUpdateDetails}
                      path={currentSubcategory(subItem.dbName)}
                      disabled={updatedDetails[subItem.dbName] === ''}
                      subTitle={subItem.name}
                    />
                  )}
                </div>
              ) : (
                // nestedItems
                <div key={subItem.name} className='content_item'>
                  {currentCategory !== 'overview' && (
                    <h3 key={subItem.subTitle}>{subItem.subTitle}</h3>
                  )}
                  {subItem.nestedItems.map(nestedItem => (
                    <React.Fragment key={nestedItem.name}>
                      <div className='content_subitem'>
                        {currentCategory !== 'overview' && <h4>{nestedItem.name}</h4>}
                        {!nestedItem.value || nestedItem.value.length === 0 ? (
                          <div
                            className='add_row'
                            onClick={() => handleShowDetailsInput(nestedItem.dbName)}>
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
                                onClick={() => handleShowDetailsInput(nestedItem.dbName)}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {showDetailInput === nestedItem.dbName && (
                        <DetailInput
                          name={nestedItem.dbName}
                          value={updatedDetails[nestedItem.dbName]}
                          defaultValue={nestedItem.value}
                          changeHandler={handleChange}
                          cancelHandler={resetDetails}
                          saveHandler={handleUpdateDetails}
                          path={currentSubcategory(nestedItem.dbName)} // fix tgis ååå
                          disabled={updatedDetails[nestedItem.dbName] === ''}
                          subTitle={nestedItem.name}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )
            )}
        </div>
      </section>
    </>
  );
};
