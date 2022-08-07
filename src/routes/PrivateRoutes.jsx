import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setCredentials } from 'features/auth/authSlice';
import { useRefreshAccessTokenQuery } from 'features/auth/authApiSlice';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken } = useSelector(state => state.auth);

  const { data, isError } = useRefreshAccessTokenQuery();

  if (isError) {
    navigate('/login');
  }

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  if (accessToken) return <Outlet />;

  return <h1>Loading...</h1>;
};
