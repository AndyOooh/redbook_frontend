import { ToggleSwitch } from 'components';
import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { UpdateBio } from './UpdateBio';

// Toggle Switch Component
// Note: id, checked and onChange are required for ToggleSwitch component to function.
// The props name, small, disabled and optionLabels are optional.
// Usage: <ToggleSwitch id={id} checked={value} onChange={checked => setValue(checked)}} />

export const DetailItem = ({
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  text,
  rel,
  section,
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {value ? (
        <div className='details_item'>
          <ToggleSwitch id={name} name={name} onChange={handleChange} />
          <p>{value}</p>
          <i className='edit_icon' onClick={() => navigate(`about?section=${section}`)}></i>
        </div>
      ) : (
        <div className='add_detail_wrap' onClick={() => navigate(`about?section=${section}`)}>
          <BsPlusCircle className='icon_plus' />
          <span className='underline'>Add {text}</span>
        </div>
      )}
      {show && (
        <UpdateBio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          handleSubmitDetails={updateDetails}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </>
  );
};
