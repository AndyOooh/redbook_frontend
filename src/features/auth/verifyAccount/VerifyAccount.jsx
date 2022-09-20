import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import 'pages/home/Home.scss';
import './VerifyAccount.scss';
import { VerifyModal } from './VerifyModal';
import { Header } from 'layout/header/Header';
import { Home } from 'pages/home/Home';
import { updateUser } from 'features/auth/authSlice';
import { useVerifyAccountMutation } from '../authApiSlice';

export const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('in VerifyAccount');

  const verificationToken = searchParams.get('verificationToken');

  const [verifyAccount, { isLoading, isSuccess, error, data }] = useVerifyAccountMutation();

  const successMessage = data?.message; //Not a good message. Just for demonstartion using data prop from mutation. Could be geeric string instead

  useEffect(() => {
    console.log('in useEffect');
    if (!verificationToken) {
      navigate('/login');
    }

    const verify = async () => {
      try {
        await verifyAccount(verificationToken).unwrap();
        dispatch(updateUser({ verified: 'true' }));
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        navigate('/');
      }, 6000);
    };

    verify();
  }, [verificationToken, navigate, dispatch, verifyAccount]);

  return (
    <>
      <VerifyModal {...{ isLoading, isSuccess, error, successMessage }} />
      <Header />
      <Home />
    </>
  );
};
