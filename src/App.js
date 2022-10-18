import { Routes, Route } from 'react-router-dom';

import { Login } from 'pages/login/Login';
import { Profile } from 'pages/profile/Profile';
import { Home } from 'pages/home/Home';
import { PublicRoutes } from 'routes/PublicRoutes';
import { VerifyAccount } from 'features/auth/verifyAccount/VerifyAccount';
import { ResetPassword } from 'pages/resetPassword';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { Developing } from 'pages/Developing';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { useContext } from 'react';
import { ProfileProvider } from 'pages/profile/profileContext/ProfileProvider';

console.log('in App.js');

const App = () => {
  return (
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
        <Route path='/verify' element={<VerifyAccount />} />
        <Route
          exact
          path=':username/*'
          element={
            <ProfileProvider>
              <Profile />
            </ProfileProvider>
          }
        />
        <Route
          exact
          path='profile/*'
          element={
            <ProfileProvider>
              <Profile />
            </ProfileProvider>
          }></Route>
        <Route exact path='/' element={<Home />} />
      </Route>
      <Route path='/reset' element={<ResetPassword />} />
      {/* <Route exact path='/users' element={<Users />} /> // Here ----------------------- */}
    </Routes>
  );
};

export default App;
