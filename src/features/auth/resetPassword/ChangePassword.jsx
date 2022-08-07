import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TextInput } from 'components';
import { passwordvalidation } from './resetPassword.validation';
import { useChangePasswordMutation } from 'features/auth/authApiSlice';

export const ChangePassword = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const navigate = useNavigate();

  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const changePwHandler = async () => {
    try {
      await changePassword({ email, password }).unwrap();
      navigate('/');
    } catch (error) {
      console.log('error', error.data.message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        password,
        confPassword,
      }}
      validationSchema={passwordvalidation}
      onSubmit={changePwHandler}>
      {/* {formik => ( */}
      {({ errors, touched }) => (
        <Form>
          <TextInput
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='New password'
          />
          <TextInput
            type='password'
            name='confPassword'
            onChange={e => setConfPassword(e.target.value)}
            placeholder='Confirm new password'
          />
          {error && <div className='error_text'>{error.data.message}</div>}
          <div className='reset_form_btns'>
            <Link to='/login' className='btn gray_btn'>
              Cancel
            </Link>
            <button type='submit' className='btn blue_btn'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
