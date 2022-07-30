import { useRefreshAccessTokenMutation } from 'features/auth/authApiSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { PersistLogin } from './PersistLogin';

export const PersistLoginWrapper = () => {
  const { accessToken } = useSelector(state => state.auth);
  return accessToken ? <Outlet /> : <PersistLogin />;
};
