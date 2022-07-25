import { Routes, Route } from 'react-router-dom';

import Login from 'pages/login/Login';
import Profile from 'pages/profile/Profile';
import Home from 'pages/home/Home';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { PublucRoutes } from 'routes/PublucRoutes';
import { VerifyAccount } from 'features/auth/verifyAccount/VerifyAccount';
import { ResetPassword } from 'pages/resetPassword';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route element={<PublucRoutes />}>
          <Route exact path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/activate' element={<VerifyAccount />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/' element={<Home />} />
        </Route>
        <Route path='/reset' element={<ResetPassword />} />
      </Routes>
    </main>
  );
};
export default Main;
