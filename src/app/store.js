import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from 'app/api/apiSlice';

import authReducer from '../features/auth/authSlice'; 


export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})

