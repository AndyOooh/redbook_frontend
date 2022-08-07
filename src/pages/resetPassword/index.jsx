import { useState } from 'react';

import './index.scss';
import { ResetHeader } from './ResetHeader';
import { SearchAccount } from 'features';
import { SendEmail } from 'features';
import { CodeVerification } from 'features';
import { ChangePassword } from 'features';

export const ResetPassword = () => {
  const [userData, setUserData] = useState({ email: '', picture: '' });
  const [content, setContent] = useState('search');

  let moduleHeader = '';
  let moduleText = '';

  switch (content) {
    case 'search':
      moduleHeader = 'Find Your Account';
      moduleText = 'Please enter your email address or mobile number to search for your account.';
      break;
    case 'sendEmail':
      moduleHeader = 'Reset Your Password';
      moduleText = 'How do you want to receive the code to reset your password?';
      break;
    case 'verifyCode':
      moduleHeader = 'Code verification';
      moduleText = 'Please enter code that has been sent to your email.';
      break;
    case 'changePassword':
      moduleHeader = 'Change Password';
      moduleText = 'Pick a strong password';
      break;
    default:
      break;
  }

  return (
    <>
      <div className='reset'>
        <ResetHeader />
        <div className='reset_form'>
          <div className='reset_form_header'>{moduleHeader}</div>
          {/* {content !== 'sendEmail' && <div className='reset_form_text'>{moduleText}</div>} */}
          <div className='vert_line'></div>
          <div className='reset_form_text'>{moduleText}</div>
          {content === 'search' && (
            <SearchAccount setUserData={setUserData} setContent={setContent} />
          )}
          {content === 'sendEmail' && <SendEmail userData={userData} setContent={setContent} />}
          {content === 'verifyCode' && (
            <CodeVerification email={userData.email} setContent={setContent} />
          )}
          {content === 'changePassword' && <ChangePassword email={userData.email} />}
        </div>
      </div>
    </>
  );
};
