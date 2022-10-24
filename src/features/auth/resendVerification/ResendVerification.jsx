import { useUpdateUserMutation } from 'features/users/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { useResendVerificationEmailMutation } from '../authApiSlice';
import { selectCurrentUser, updateUserStore } from '../authSlice';
import './ResendVerification.scss';

export const ResendVerification = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { REACT_APP_DWIGHT_USERNAME } = process.env;
  const [resendVerificationEmail, { isLoading: resendLoading, isSuccess, isError, error, data }] =
    useResendVerificationEmailMutation();

  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();

  const handleSendVerificationLink = async () => {
    try {
      await resendVerificationEmail().unwrap();
    } catch (error) {
      console.log('🚀 ~ file: ResendVerification.jsx ~ line 21 ~ error', error);
    }
  };

  const handleCheatVerify = async () => {
    try {
      const data = await updateUser({
        postData: { verify: true },
        userId: user.id,
        path: 'verified',
      }).unwrap();
      dispatch(updateUserStore({ verified: true }));
    } catch (error) {
      console.log(error);
    }
  };

  let content;
  if (updateUserLoading || resendLoading) {
    content = <DotLoader color='var(--red-main)' size={'10rem'} className='dotLoader' />;
  }
  if (isSuccess) {
    content = <div className='success_text'>{data.message}</div>;
  } else if (isError) {
    content = <div className='error_text'>{error?.data.message}</div>;
  } else {
    content = (
      <div className='send_verification'>
        <h1 className='welcome'>Welcome to Redbook, {user?.first_name}!</h1> <br />
        <span>
          Looks like you're already friends with the boss himself. Why don't you check if you have a
          friend request from his assistant,&nbsp;
          <NavLink to={`/${REACT_APP_DWIGHT_USERNAME}`} className='dwight_link'>
            <span className='dwight'> Dwight?</span>
          </NavLink>
        </span>{' '}
        <br />
        <span>
          Also, do you still work at McDonald's? If not, maybe you should update your{' '}
          <NavLink to='/profile' className='profile_link'>
            profile details.
          </NavLink>
        </span>{' '}
        <br />
        <span>
          Lastly, your account is not verified yet. Unverified accounts will be deleted after one
          month.
        </span>{' '}
        <br />
        <button href='#' onClick={handleSendVerificationLink}>
          Click here to resend verification email.
        </button>
        <br />
        <button href='#' onClick={handleCheatVerify}>
          Or here to not see this message again.
        </button>
      </div>
    );
  }

  return <section className='card_main'>{content}</section>;
};
