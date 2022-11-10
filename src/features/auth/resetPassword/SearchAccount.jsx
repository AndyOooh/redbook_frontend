import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from 'components';
import { useFindUserMutation } from 'features/auth/authApiSlice';
import { emailValidation } from './resetPassword.validation';

export const SearchAccount = ({ setUserData, setContent }) => {
  const [email, setEmail] = useState('');

  const [findUser, { isLoading, error }] = useFindUserMutation();

  const handleSearch = async () => {
    try {
      const data = await findUser(email).unwrap();
      setUserData(data);
      setContent('sendEmail');
      // setError('');
    } catch (error) {
      console.log('error', error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        email,
      }}
      validationSchema={emailValidation}
      onSubmit={handleSearch}>
      {formik => (
        <Form>
          {/* <TextInput type='text' name='email' onChange={handleInputChange} /> */}
          <TextInput type='text' name='email' onChange={e => setEmail(e.target.value)} />
          {error && <div className='error_text'>{error.data.message}</div>}
          <div className='reset_form_btns'>
            <Link to='/login' className='btn gray_btn'>
              Cancel
            </Link>
            <button type='submit' className='btn red_btn'>
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
