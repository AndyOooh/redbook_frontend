import { useState } from 'react';

import { LoginForm } from 'features';
import { LoginWelcome } from 'features/';
import { RegisterForm } from 'features';
import { LoginFooter } from 'features/';

import './Login.scss';
// import classes from './index.scss';

export const Login = () => {
  const [registerVisible, setRegisterIsVisible] = useState(false);

  return (
    <>
      <div className='login_wrapper'>
        <LoginWelcome />
        <LoginForm setRegisterIsVisible={setRegisterIsVisible} />
      </div>
      <LoginFooter />
      {/* {registerVisible && <RegisterForm visible={registerVisible} setIsVisible={setRegisterIsVisible} />} */}
      <RegisterForm visible={registerVisible} setIsVisible={setRegisterIsVisible} />
    </>
  );
};
export default Login;
