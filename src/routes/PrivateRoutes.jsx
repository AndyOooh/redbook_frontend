import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const {user} = useSelector(state => state.auth);
  return user ? <Outlet /> : <Navigate to='/login' />;
};
