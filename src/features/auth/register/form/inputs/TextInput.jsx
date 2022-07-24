import { useField, ErrorMessage } from 'formik';
import { useMediaQuery } from 'react-responsive';

// import './TextInput.scss';

export const TextInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  // const view1 = useMediaQuery({
  //   query: '(min-width: 539px)',
  // });
  // const view2 = useMediaQuery({
  //   query: '(min-width: 85rem)',
  // });
  const view3 = useMediaQuery({
    query: '(min-width: 117rem)',
  });

  // const test1 = view3 && field.name === 'first_name';
  // const test2 = view3 && field.name === 'last_name';

  return (
    <div>
      <input
        className={meta.touched && meta.error ? 'input_error_border textInput' : 'textInput'}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className='input_error'>
          {/* {meta.touched && meta.error && <ErrorMessage name={field.name} />} */}
          <ErrorMessage name={field.name} />
          <div
            className={
              view3 && field.name !== 'last_name'
                ? 'error_arrow_left'
                : view3 && field.name === 'last_name'
                ? 'error_arrow_right'
                : !view3 && 'error_arrow_bottom'
            }></div>

          {/* {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== 'last_name'
                  ? 'error_arrow_left'
                  : view3 && field.name === 'last_name'
                  ? 'error_arrow_right'
                  : !view3 && 'error_arrow_bottom'
              }></div>
          )} */}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className={
            field.name === 'first_name' || field.name === 'last_name'
              ? 'error_icon error_icon_names'
              : field.name === 'email'
              ? 'error_icon error_icon_email'
              : 'error_icon error_icon_password'
          }></i>
      )}
    </div>
  );
};
