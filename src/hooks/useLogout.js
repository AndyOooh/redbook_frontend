
import { useDispatch } from 'react-redux';

import { useLogoutMutation } from 'features/auth/authApiSlice';
import { reset } from 'features/auth/authSlice';

export const useLogoutHandler = async () => {
    const dispatch = useDispatch();
    const { logout, isLoading } = useLogoutMutation();

    await logout();
    dispatch(reset());
  };

  