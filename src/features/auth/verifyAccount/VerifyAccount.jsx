import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import 'pages/home/Home.scss';
import './VerifyAccount.scss';
import { VerifyForm } from './VerifyForm';
import Header from 'layout/header';
import Home from '../../../pages/home/Home';
import { verifyAccount, reset } from 'features/auth/authSlice';
import { useVerifyAccountMutation } from '../authApiSlice';

export const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activationToken = searchParams.get('activationToken');
  const { user } = useSelector(state => state.auth);

  const [verifyAccount, { isLoading, error }] = useVerifyAccountMutation();

  useEffect(() => {
    if (!activationToken) {
      navigate('/login');
    }
    verify();
  }, [activationToken, navigate]);

  const verify = async () => {
    try {
      const data = await dispatch(verifyAccount(activationToken)).unwrap();
      console.log('past dispatch data: ', data);
      localStorage.setItem('user', JSON.stringify({ ...user, verified: true }));
      setTimeout(() => {
        reset();
        navigate('/');
      }, 3000);
    } catch (error) {
      console.log('error in activate', error);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const registerSubmitHandler = async e => {
    console.log('in registerSubmitHandler');
    try {
      const userData = await register(formData).unwrap();
      dispatch(setCredentials({ ...userData }));
      setFormData(initialFormData);
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <VerifyForm />
      <Header />
      <Home />
    </>
  );
};
