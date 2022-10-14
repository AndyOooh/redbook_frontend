import { useDispatch } from 'react-redux';

import { useLogoutMutation } from 'features/auth/authApiSlice';
import { resetAuthState } from 'features/auth/authSlice';
import { apiSlice } from 'app/api/apiSlice';

// Not currently in use!! Should work though
export const useLogoutHandler = async () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  await logout();
  dispatch(resetAuthState());
  dispatch(apiSlice.util.resetApiState());
};
