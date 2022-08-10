import { useResendVerificationEmailMutation } from '../authApiSlice';
import './ResendVerification.scss';

export const ResendVerification = () => {
  console.log('in resend verification 1');

  const [resendVerificationEmail, { isLoading, isSuccess, isError, error, data }] =
    useResendVerificationEmailMutation();

  const handleSendVerificationLink = async () => {
    try {
      await resendVerificationEmail().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  let content;
  if (isSuccess) {
    content = <div className='success_text'>{data.message}</div>;
  } else if (isError) {
    content = <div className='error_text'>{error?.data.message}</div>;
  } else {
    content = (
      <div className='send_verification'>
        <span>
          Your account is not verified. Unverified accounts will be deleted after one month.
        </span>
        <button href='#' onClick={handleSendVerificationLink}>
          Click here to resend verification link
        </button>
      </div>
    );
  }

  return <section className='home_card'>{content}</section>;
};
