import { useDispatch, useSelector } from 'react-redux';
import { resendVerificationEmail } from '../authSlice';
import './ResendVerification.scss';

export const ResendVerification = () => {
  const { isError, isSuccess, message } = useSelector(state => state.auth);
  const { verified } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  console.log('in ResendVerification: ', verified);

  const sendVerificationLink = async () => {
    try {
      await dispatch(resendVerificationEmail()).unwrap();
    } catch (error) {
      console.log('error in ResendVerification: ', error);
    }
  };

  const content = () => {
    if (!verified) {
      if (isSuccess) {
        return <div className='success_text'>{message}</div>;
      } else if (isError) {
        return <div className='error_text'>{message}</div>;
      } else {
        return (
          <div className='send_verification'>
            <span>
              Your account is not verified, verify your account before it gets deleted after a month
              from creating.
            </span>
            <button href='#' onClick={() => sendVerificationLink()}>
              Click here to resend verification link
            </button>
          </div>
        );
      }
    } else return null;
  };

  const content2 = content();

  console.log('content: ', content());
  return content2 ;
  // {if (verified) {
  //     if (isSuccess) {
  //      return <div className='success_text'>{message}</div>;
  //   }
  // } else null})

  // if (!verified) {
  //   return isSuccess ? (
  //     <div className='success_text'>{message}</div>
  //   ) : isError ? return (
  //     <div className='error_text'>{message}</div>
  //   ) : return (
  //     <div className='send_verification'>
  //       <span>
  //         Your account is not verified, verify your account before it gets deleted after a month
  //         from creating.
  //       </span>
  //       <button href='#' onClick={() => sendVerificationLink()}>
  //         Click here to resend verification link
  //       </button>
  //     </div>
  //   );
  // } else return null;
};
