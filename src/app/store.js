import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'app/api/apiSlice';

import authReducer from 'features/auth/authSlice';
import postReducer from 'features/posts/postSlice';
import usersReducer from 'features/users/usersSlice';


export default configureStore({
  reducer: {
    auth: authReducer,
    // posts: postReducer,
    // users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});
