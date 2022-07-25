import { useDispatch, useSelector } from 'react-redux';
import { resendActivationEmail } from '../authSlice';
import './ResendVerification.scss';

export const ResendVerification = () => {
  const { isError, isSuccess, message } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const sendVerificationLink = async () => {
    try {
      await dispatch(resendActivationEmail()).unwrap();
    } catch (error) {
      console.log('error in resendActivationEmail', error);
    }
  };

  return isSuccess ? (
    <div className='success_text'>{message}</div>
  ) : isError ? (
    <div className='error_text'>{message}</div>
  ) : (
    <div className='send_verification'>
      <span>
        Your account is not verified, verify your account before it gets deleted after a month from
        creating.
      </span>
      <button href='#' onClick={() => sendVerificationLink()}>
        Click here to resend verification link
      </button>
    </div>
  );
};
