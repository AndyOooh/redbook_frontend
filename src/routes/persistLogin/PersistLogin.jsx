import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setCredentials } from 'features/auth/authSlice';
import { useRefreshAccessTokenQuery } from 'features/auth/authApiSlice';

export const PersistLogin = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useRefreshAccessTokenQuery();
  console.log('isLoading', isLoading);

  let content = <h1>Loading...</h1>;

  if (isError) {
    content = <h1>Error: {error.message}</h1>;
  }

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return content;
};
