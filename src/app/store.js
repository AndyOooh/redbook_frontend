import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'app/api/apiSlice';

import authReducer from 'features/auth/authSlice';
import postReducer from 'features/posts/postSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});
