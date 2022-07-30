import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import DotLoader from 'react-spinners/DotLoader';

import './LoginForm.scss';
import { TextInput } from './inputs/LoginInputs';
import { loginvalidation } from './loginValidation';
import { reset, setCredentials } from 'features/auth/authSlice';
import { useLoginMutation } from 'features/auth/authApiSlice';

export const LoginForm = ({ setIsVisible }) => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const formIsValid = loginvalidation.isValidSync(formData);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // submitHandler ------------------------------------------------------
  const loginSubmitHandler = async () => {
    try {
      const userData = await login(formData).unwrap();
      dispatch(setCredentials({ ...userData }));
      setFormData(initialFormData);
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };
  // -------------------------------------------------------

  // return ------------------------------------------------
  return (
    <div>
      <div className='loginForm_wrapper'>
        <Formik
          enableReinitialize
          initialValues={{
            ...formData,
          }}
          validationSchema={loginvalidation}
          onSubmit={loginSubmitHandler}>
          <Form className='form'>
            <TextInput
              name='email'
              type='text'
              placeholder='Email or phone number'
              onChange={handleInputChange}
            />
            <TextInput
              name='password'
              type='password'
              placeholder='Password'
              onChange={handleInputChange}
            />
            {!isLoading && (
              <button className='btn red_btn' type='submit' disabled={!formIsValid}>
                Log In
              </button>
            )}
            {isError && <div className='error_text'>{error.data.message}</div>}
          </Form>
        </Formik>
        {/* {isError && <div className='error_text'>{error}</div>} */}
        {/* {isSuccess && <div className='success_text'>{message}</div>} */}

        {isLoading ? (
          <DotLoader color='#1876f2' loading={isLoading} size={30} />
        ) : (
          <>
            <Link to='/reset' className='forgot_password'>
              Forgot password?
            </Link>
            <div className='vert_line'></div>

            <div className='btn_wrapper'>
              <button
                type='button'
                className='btn red_btn create_account_btn'
                onClick={() => {
                  setIsVisible(true);
                  dispatch(reset());
                }}>
                Create new account
              </button>
            </div>
          </>
        )}
      </div>

      <Link to='/' className='sign_extra'>
        <b>Create a Page</b> for a celebrity, brand or business.
      </Link>
    </div>
  );
  // -------------------------------------------------------
};
