import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logout, setCredentials } from 'features/auth/authSlice';

console.log('in apiSlice');

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // console.log('in baseQuery');
    const token = getState().auth.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   console.log('in baseQueryWithReauth');
//   let result = await baseQuery(args, api, extraOptions);
//   console.log('result: ', result);

//   if (result?.error?.originalStatus === 403) {
//     console.log('sending refresh token');
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       // store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

// Define our single API slice object

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  // baseQuery: baseQueryWithReauth,
  tagTypes: ['PostsTag', 'UserTag'],
  endpoints: builder => ({}),
});

