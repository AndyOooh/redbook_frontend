import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log('in PublicRoutes');
  return currentUser ? <Navigate to='/' /> : <Outlet />;
};

// Alternative ways of checking if object is empty:
// Object.keys(obj).length === 0
// return JSON.stringify(obj) === '{}'
