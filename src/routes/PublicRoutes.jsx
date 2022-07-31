import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
  const { user } = useSelector(state => state.auth);
  console.log('in PublucRoutes, user: ', user);
  return user ? <Navigate to='/' /> : <Outlet />;
};

// Alternative ways of checking if object is empty:
// Object.keys(obj).length === 0
// return JSON.stringify(obj) === '{}'
