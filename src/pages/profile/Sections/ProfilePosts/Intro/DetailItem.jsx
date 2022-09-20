import { ToggleSwitch } from 'components';
import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import { UpdateBio } from './UpdateBio';

// Toggle Switch Component
// Note: id, checked and onChange are required for ToggleSwitch component to function.
// The props name, small, disabled and optionLabels are optional.
// Usage: <ToggleSwitch id={id} checked={value} onChange={checked => setValue(checked)}} />

export const DetailItem = ({
  publicc,
  // img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  // infos,
  text,
  rel,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className='details_item'>
      {/* <div className='details_col ' onClick={() => setShow(true)}> */}
      {value ? (
        // <div className='info_profile '>

        <>
          <ToggleSwitch id={name} checked={publicc} onChange={handleChange} />
          {/* <label class='switch'>
              <input type='checkbox' checked />
              <span class='slider round'></span>
            </label> */}

          {/* <img src={`../../../icons/${img}.png`} alt='' /> */}
          <p>{value}</p>

          <i className='edit_icon'></i>
        </>
      ) : (
        // </div>
        <>
          {/* <i className='rounded_plus_icon'></i> */}
          <BsPlusCircle className='icon_plus' />
          <span className='underline'>Add {text}</span>
        </>
      )}
      {/* </div> */}
      {show && (
        <UpdateBio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          // infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
};
