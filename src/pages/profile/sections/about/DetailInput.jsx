import React from 'react';
import { relationshopOptions } from './detailInputData';

export const DetailInput = ({
  name,
  value,
  changeHandler,
  cancelHandler,
  saveHandler,
  path,
  disabled,
  subTitle,
}) => {
  const instaPlaceholder = 'For example: rainnWilson. No @, https or www.';

  return (
    <div className='detail_input'>
      {subTitle === 'Relationship' ? (
        <select name={name} value={value} onChange={changeHandler}>
          {relationshopOptions.map(option => (
            <option value={option}>{option}</option>
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
          />
        </>
      )}
      <div className='button_row'>
        <div className='buttons'>
          <button type='button' onClick={cancelHandler} className='btn grey_btn'>
            Cancel
          </button>
          {/* <button type='button' onClick={saveHandler} className='btn red_btn' disabled={disabled}> */}
          <button
            type='button'
            onClick={e => saveHandler(e, path)}
            className='btn red_btn'
            disabled={disabled}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
