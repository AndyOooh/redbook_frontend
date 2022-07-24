import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublucRoutes = () => {
  const { user } = useSelector(state => state.auth);
  return user ? <Navigate to='/' /> : <Outlet />;
};

// Alternative ways of checking if object is empty:
// Object.keys(obj).length === 0
// return JSON.stringify(obj) === '{}'
