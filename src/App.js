import { Routes, Route } from 'react-router-dom';

import { PublicRoutes } from 'routes/PublicRoutes';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { Home } from 'pages/home/Home';
import { Login } from 'pages/login/Login';
import { ProfileLayout } from 'pages/profile/ProfileLayout';
import { Profile } from 'pages/profile/Profile';
import { VerifyAccount } from 'features/auth/verifyAccount/VerifyAccount';
import { ResetPassword } from 'pages/resetPassword';
import { Developing } from 'pages/Developing';
import { useSelector } from 'react-redux';

const App = () => {
  const theme  = useSelector(state => state.auth.user?.theme);
  const themeClass = theme || 'dark'; // for login page as we don't have user yet.

  return (
    <div className={themeClass}>
      <div className='app'>
        {/* <div className='app'>  */}
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route exact path='/login' element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            {/* Not developed */}
            <Route path='/groups' element={<Developing />} />
            <Route path='/watch' element={<Developing />} />
            <Route path='/marketplace' element={<Developing />} />
            <Route path='/gaming' element={<Developing />} />
            {/* Developed */}
            <Route element={<ProfileLayout />}>
              <Route path='/profile/*' element={<Profile />} />
              <Route path='/:username/*' element={<Profile />} />
            </Route>
            <Route path='/verify' element={<VerifyAccount />} />
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route path='/reset' element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
