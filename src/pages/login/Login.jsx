import { useState } from 'react';

import { LoginForm } from 'features';
import { LoginWelcome } from 'features/';
import { RegisterForm } from 'features';
import { LoginFooter } from 'features/';

import './Login.scss';
// import classes from './index.scss';

export const Login = () => {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);

  return (
    <>
      <div className='login_wrapper'>
        <LoginWelcome />
        <LoginForm setRegisterFormVisible={setRegisterFormVisible} />
      </div>
      <LoginFooter />
      <RegisterForm visible={registerFormVisible} setVisible={setRegisterFormVisible} />
    </>
  );
};
export default Login;
