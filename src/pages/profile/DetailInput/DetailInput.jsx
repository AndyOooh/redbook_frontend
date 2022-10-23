import React from 'react';
import { relationshopOptions } from './detailInputData';

import './DetailInput.scss';

export const DetailInput = ({
  name,
  value,
  changeHandler,
  cancelHandler,
  saveHandler,
  path,
  disabled,
  subTitle,
  remainingChar,
  defaulValue,
}) => {
  console.log('🚀 ~ file: DetailInput.jsx ~ line 18 ~ path', path)
  console.log('🚀 ~ file: DetailInput.jsx ~ line 14 ~ name', name);
  console.log('🚀 ~ file: DetailInput.jsx ~ line 14 ~ subTitle', subTitle);

  
  const instaPlaceholder = 'For example: rainnWilson. No @, https or www.';

  return (
    <div className='detail_input'>
      {name === 'relationshipStatus' ? (
        <select name={name} value={value} onChange={changeHandler}>
          {relationshopOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <>
          <label htmlFor={name} />
          <textarea
            type='text'
            id={name}
            name={name}
            value={value}
            onChange={changeHandler}
            placeholder={subTitle === 'Instagram' ? instaPlaceholder : subTitle}
            // defaultValue={value}
            defaultValue={defaulValue}
          />
        </>
      )}
      {name === 'bio' && <div className='remaining'>{remainingChar} Characters remaining</div>}
      <div className='button_row'>
        <button type='button' onClick={cancelHandler} className='btn grey_btn'>
          Cancel
        </button>
        <button
          type='button'
          onClick={e => saveHandler(e, path)}
          className='btn red_btn'
          disabled={disabled}>
          Save
        </button>
      </div>
    </div>
  );
};
