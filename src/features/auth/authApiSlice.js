import { apiSlice } from 'app/api/apiSlice';
import authService from './authService';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: userInputs => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: userInputs => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
    verifyAcount: builder.mutation({
      query: verificationToken => ({
        url: `auth/verify/${verificationToken}`,
        method: 'PATCH',
      }),
    }),
    resendVerificationEmail: builder.query({
      query: '/auth/resendverify',
    }),
    refreshAccessToken: builder.query({
      query: () => '/auth/refresh',
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
  useResendVerificationEmailMutation,
  useRefreshAccessTokenMutation,
  useRefreshAccessTokenQuery,
} = authApiSlice;
