import { Link } from 'react-router-dom';

import { useSendPwResetCodeMutation } from 'features/auth/authApiSlice';

export const SendEmail = ({ userData, setContent }) => {
  const [sendPwResetCode, { isLoading, error }] = useSendPwResetCodeMutation();

  const sendEmailHandler = async () => {
    try {
      const data = await sendPwResetCode(userData.email).unwrap();
      console.log('data', data);
      setContent('verifyCode');
    } catch (error) {
      console.log('error', error.data.message);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className='radio_row hover1'>
        <div className='row_left'>
          <input type='radio' name='' id='email' checked readOnly />
          <label htmlFor='email'>
            <span>Send code to my email</span>
          </label>
        </div>

        <div className='row_right'>
          <img src={userData.picture} alt='' />
          <span>{userData.email}</span>
          <span>Redbook user</span>
        </div>
      </div>
      {error && (
        <div className='error_text' style={{ padding: '10px' }}>
          {error}
        </div>
      )}
      <div className='reset_form_btns'>
        <Link to='/login' className='gray_btn btn'>
          Not You ?
        </Link>
        <button onClick={sendEmailHandler} className='btn blue_btn'>
          Continue
        </button>
      </div>
    </>
  );
};
