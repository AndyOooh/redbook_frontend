import { Routes, Route } from 'react-router-dom';

import Login from 'pages/login/Login';
import { Profile } from 'pages/profile/Profile';
import { Home } from 'pages/home/Home';
import { PublicRoutes } from 'routes/PublicRoutes';
import { VerifyAccount } from 'features/auth/verifyAccount/VerifyAccount';
import { ResetPassword } from 'pages/resetPassword';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { Developing } from 'pages/Developing';

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
        <Route exact path='/profile/*' element={<Profile />}>
          {/* <Route exact path='/profile*' element={<Profile />}> */}
        </Route>
        {/* Needs to be profile of another user. Mauybe can be the same element or maybe have to split it in two */}
        {/* <Route exact path='/:username' element={<Profile />} /> */}
        <Route exact path='/:username/*' element={<Profile />} />
        <Route exact path='/' element={<Home />} />
      </Route>
      <Route path='/reset' element={<ResetPassword />} />
      {/* <Route exact path='/users' element={<Users />} /> // Here ----------------------- */}
    </Routes>
  );
};

export default App;
