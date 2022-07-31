import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setCredentials } from 'features/auth/authSlice';
import { useRefreshAccessTokenQuery } from 'features/auth/authApiSlice';
import { Navigate } from 'react-router-dom';

export const PersistLogin = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useRefreshAccessTokenQuery();
  console.log('in PersistLogin isLoading: ', isLoading);

  let content = <h1>Loading...</h1>;

  if (isError) {
    content = <Navigate to='/login' />;
  }

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return content;
};
