import { Routes, Route } from 'react-router-dom';

import Login from 'pages/login/Login';
import Profile from 'pages/profile/Profile';
import Home from 'pages/home/Home';
import { PrivateRoutes } from 'routes/PrivateRoutes';
import { PublucRoutes } from 'routes/PublucRoutes';
import { ActivateAccount } from 'features/auth/activateAccount/ActivateAccount';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route element={<PublucRoutes />}>
          <Route exact path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/activate' element={<ActivateAccount />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/' element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};
export default Main;
