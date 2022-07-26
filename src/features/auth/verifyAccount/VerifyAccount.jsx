import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import 'pages/home/Home.scss';
import './VerifyAccount.scss';
import { VerifyForm } from './VerifyForm';
import Header from 'layout/header';
import Home from '../../../pages/home/Home';
import { verifyAccount, reset } from 'features/auth/authSlice';

export const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activationToken = searchParams.get('activationToken');
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!activationToken) {
      navigate('/login');
    }
    activate();
  }, [activationToken, navigate]);

  const activate = async () => {
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

  return (
    <>
      <VerifyForm />
      <Header />
      <Home />
    </>
  );
};
