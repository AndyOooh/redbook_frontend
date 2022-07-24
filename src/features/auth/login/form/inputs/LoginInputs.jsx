import { useField, ErrorMessage } from 'formik';

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input className={meta.touched && meta.error ? ' error ' : ''} {...field} {...props} />
      {meta.touched && meta.error ? <div className='error-message'>{meta.error}</div> : null}
    </>
  );
};
