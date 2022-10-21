import React from 'react';

export const DetailInput = ({
  name,
  value,
  changeHandler,
  cancelHandler,
  saveHandler,
  disabled,
  subTitle,
}) => {
  const instaPlaceholder = 'For example: rainnWilson. No @, https or www.';

  return (
    <div className='detail_input'>
      {subTitle === 'Relationship' ? (
        <select name={name} value={value} onChange={changeHandler}>
          <option value='Single'>Single</option>
          <option value='In a relationship'>In a relationship</option>
          <option value='Married'>Married</option>
          <option value='Engaged'>Engaged</option>
          <option value="It's Complicated">It's Complicated</option>
          <option value='Prefer not to say'>Prefer not to say</option>
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
          <button type='button' onClick={saveHandler} className='btn red_btn' disabled={disabled}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
