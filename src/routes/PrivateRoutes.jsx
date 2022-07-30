import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  console.log('in PrivateRoutes');

  // const {user} = useSelector(state => state.auth);
  const { accessToken } = useSelector(state => state.auth);

  // return user ? <Outlet /> : <Navigate to='/login' />;
  return accessToken ? <Outlet /> : <Navigate to='/login' />;
};
