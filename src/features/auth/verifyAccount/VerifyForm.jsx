import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';

import 'pages/home/Home.scss';
import './VerifyAccount.scss';
// import { verifyAccount, reset } from 'features/auth/authSlice';
import { Modal } from 'components';

// export const VerifyForm = ({ verificationToken }) => {
export const VerifyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get('verificationToken');

  const { isLoading, isSuccess, message } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.auth);

  const headerText = isSuccess ? 'Account verification succeded.' : 'Account verification failed.';

  // const verify = useCallback(async () => {
  //   try {
  //     console.log('in verify');
  //     // const data = await dispatch(verifyAccount(verificationToken)).unwrap();
  //     console.log('past dispatch data: ', data);
  //     localStorage.setItem('user', JSON.stringify({ ...user, verified: true }));
  //     // setTimeout(() => {
  //     //   reset();
  //     //   navigate('/');
  //     // }, 3000);
  //   } catch (error) {
  //     console.log('error in verify: ', error);
  //     // setTimeout(() => {
  //     //   navigate('/');
  //     // }, 3000);
  //   }
  // }, [dispatch, user, verificationToken]);

  // useEffect(() => {
  //   console.log('in useEftect of VerifyForm');
  //   // searchParams.delete('verificationToken');
  //   if (!verificationToken) {
  //     navigate('/login');
  //   }
  //   verify();
  // }, []);

  // verify();

  return (
    <Modal styles='verify_modal'>
      {isLoading ? (
        <DotLoader color='#1876f2' size={40} loading={isLoading} />
      ) : (
        <>
          <div className={`header ${isSuccess ? 'success_text' : 'error_text'}`}>{headerText}</div>
          <div className='message'>{message}</div>
        </>
      )}
    </Modal>
  );
};
