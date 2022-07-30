import { useState } from 'react';

import { LoginForm } from 'features';
import { LoginWelcome } from 'features/';
import { RegisterForm } from 'features';
import { LoginFooter } from 'features/';

import './Login.scss';
// import classes from './index.scss';

export const Login = () => {
  const [registerVisible, setRegisterIsVisible] = useState(false);


  console.log('in Login Page')

  return (
    <>
      <div className='login_wrapper'>
        <LoginWelcome />
        <LoginForm setIsVisible={setRegisterIsVisible} />
      </div>
      <LoginFooter />
      {registerVisible && <RegisterForm setIsVisible={setRegisterIsVisible} />}
    </>
  );
};
export default Login;
