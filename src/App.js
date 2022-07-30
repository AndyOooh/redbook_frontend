import { Routes, Route } from 'react-router-dom';

import Login from 'pages/login/Login';
import Profile from 'pages/profile/Profile';
import Home from 'pages/home/Home';
import { PublucRoutes } from 'routes/PublucRoutes';

// import { VerifyAccount } from 'features/auth/verifyAccount/VerifyAccount';
import { ResetPassword } from 'pages/resetPassword';
import { PersistLoginWrapper } from 'routes/persistLogin/PersistLoginWrapper';

const App = () => {
  return (
    <Routes>
      <Route element={<PublucRoutes />}>
        <Route exact path='/login' element={<Login />} />
      </Route>

      <Route element={<PersistLoginWrapper />}>
        {/* <Route path='/activate' element={<VerifyAccount />} />  */}
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/' element={<Home />} />
      </Route>
      <Route path='/reset' element={<ResetPassword />} />
      {/* <Route exact path='/users' element={<Users />} /> // Here ----------------------- */}
    </Routes>
  );
};

export default App;
