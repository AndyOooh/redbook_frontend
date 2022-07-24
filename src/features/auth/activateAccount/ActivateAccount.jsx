import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import 'pages/home/Home.scss';
import './ActivateAccount.scss';
import { ActivateForm } from './ActivateForm';
import Header from 'layout/header';
import Home from '../../../pages/home/Home';
import { activateAccount, reset } from 'features/auth/authSlice';

export const ActivateAccount = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activationToken = searchParams.get('activationToken');
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (!activationToken) {
      navigate('/login');
    }
    activate();
  }, [activationToken, navigate]);

  const activate = async () => {
    try {
      const data = await dispatch(activateAccount(activationToken)).unwrap();
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
      {isSuccess && (
        <ActivateForm
          type='success'
          header='Account activation succeded.'
          text={message}
          loading={isLoading}
        />
      )}
      {isError && (
        <ActivateForm
          type='error'
          header='Account activation failed.'
          text={message}
          loading={isLoading}
        />
      )}
      <ActivateForm />
      <Header />
      <Home />
      {/* <div className='home'>
        <LeftHome user={user} />
        <div className='home_middle'>
          <Stories />
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div> */}
    </>
  );
};
