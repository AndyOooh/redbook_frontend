import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import DotLoader from 'react-spinners/DotLoader';

import './LoginForm.scss';
import { TextInput } from './inputs/LoginInputs';
import { loginvalidation } from './loginValidation';
import { loginUser, reset } from 'features/auth/authSlice';

export const LoginForm = ({ setIsVisible }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formIsValid = loginvalidation.isValidSync(formData);
  // const formIsValid = false;
  console.log('formIsValid', formIsValid);

  useEffect(() => {
    // if (isError) {
    //   toast.error(message)
    // }

    if (isSuccess || user) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginSubmitHandler = async () => {
    console.log('loginSubmitHandler');
    await dispatch(loginUser(formData)).unwrap();
    // console.log('unwrapped response in loginHandler', data);
    navigate('/');
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

            <button
              className='red_btn'
              type='submit'
              disabled={!formIsValid}>
              Log In
            </button>
            {isError && <div className='error_text'>{isError}</div>}
          </Form>
        </Formik>
        {isError && <div className='error_text'>{message}</div>}
        {isSuccess && <div className='success_text'>{message}</div>}

        {isLoading ? (
          <DotLoader color='#1876f2' loading={isLoading} size={30} />
        ) : (
          <Link to='/forgot' className='forgot_password'>
            Forgot password?
          </Link>
        )}
        <div className='vert_line'></div>

        <div className='btn_wrapper'>
          {isLoading ? (
            <DotLoader color='#1876f2' loading={isLoading} size={30} />
          ) : (
            <button
              className='create_account_btn red_btn'
              onClick={() => {
                setIsVisible(true);
                dispatch(reset());
              }}>
              Create new account
            </button>
          )}
        </div>
      </div>

      <Link to='/' className='sign_extra'>
        <b>Create a Page</b> for a celebrity, brand or business.
      </Link>
    </div>
  );
  // -------------------------------------------------------
};
