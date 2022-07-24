import { useMediaQuery } from 'react-responsive';

export const GenderSelect = ({ handleInputChange, genderError }) => {
  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 85rem)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 117rem)',
  });
  return (
    <>
      <div className='reg_grid'>
        <label htmlFor='male'>
          Male
          <input type='radio' name='gender' id='male' value='male' onChange={handleInputChange} />
        </label>
        <label htmlFor='female'>
          Female
          <input
            type='radio'
            name='gender'
            id='female'
            value='female'
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor='custom'>
          Custom
          <input
            type='radio'
            name='gender'
            id='custom'
            value='custom'
            onChange={handleInputChange}
          />
        </label>
      </div>
      {genderError && (
        <div className={!view3 ? 'input_error' : 'input_error input_error_select_large'}>
          <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
          {genderError}
        </div>
      )}
    </>
  );
};
