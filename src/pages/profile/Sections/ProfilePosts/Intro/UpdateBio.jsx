import React from 'react';

export const UpdateBio = ({
  // infos,
  // handleChange,
  // max,
  // setShowBio,
  // updateDetails,
  // placeholder,
  // name,
  // detail,
  // setShow,
  // rel,
  setVisible,
  updatedDetails,
  setUpdatedDetails,
  remainingChar,
  handleChange,
}) => {
  return (
    <>
      {/* <div className='add_bio_wrap'> */}
      {/* {rel ? ( */}
      {updatedDetails.relationship ? (
        <select
          className='select_rel'
          // name={name}
          value={updatedDetails.relationship}
          onChange={handleChange}>
          <option value='Single'>Single</option>
          <option value='In a relationship'>In a relationship</option>
          <option value='Married'>Married</option>
          <option value='Divorced'>Divorced</option>
        </select>
      ) : (
        <textarea
          // placeholder={placeholder}
          placeholder='Add bio'
          // name={name}
          // value={infos?.[name]}
          maxLength={updatedDetails.bio ? 25 : 100}
          className='textarea_blue details_input'
          onChange={handleChange}></textarea>
      )}
      {!updatedDetails.bio && <div className='remaining'>{remainingChar} characters remaining</div>}
      <div className='flex'>
        <div className='flex flex_left'>
          <i className='public_icon'></i>Public
        </div>
        <div className='flex flex_right'>
          <button
            className='btn gray_btn'
            // onClick={() => (!updatedDetails.bio ? setShowBio(false) : setShow(false))}
            onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button
            className='btn red_btn'
            onClick={() => {
              // updateDetails();
              // setShow(false);
            }}>
            Save
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
