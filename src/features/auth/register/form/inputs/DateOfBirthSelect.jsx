import { ErrorMessage } from 'formik';
import { useMediaQuery } from 'react-responsive';

export const DateOfBirthSelect = ({
  birth_date,
  birth_month,
  birth_year,
  days,
  months,
  years,
  handleInputChange,
  dateError,
}) => {
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
        <select name='birth_date' value={birth_date} onChange={handleInputChange}>
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </select>
        <select name='birth_month' value={birth_month} onChange={handleInputChange}>
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select name='birth_year' value={birth_year} onChange={handleInputChange}>
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {dateError && (
        <div className={!view3 ? 'input_error' : 'input_error '}>
          {dateError}
          <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
        </div>
      )}
    </>
  );
};
