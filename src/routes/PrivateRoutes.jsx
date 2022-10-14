import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectAccessToken, setCredentials } from 'features/auth/authSlice';
import { useRefreshAccessTokenQuery } from 'features/auth/authApiSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners';

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);

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

  return (
    <main className='dotloader_wrapper'>
      <DotLoader color='var(--red-main)' size={'10rem'} className='dotLoader' />
    </main>
  );
};
