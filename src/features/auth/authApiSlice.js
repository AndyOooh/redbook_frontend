import { apiSlice } from 'app/api/apiSlice';
import authService from './[old]authService';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refreshAccessToken: builder.query({
      query: () => '/auth/refresh',
    }),
    // refreshAccessToken: builder.mutation({
    //   query: () => ({
    //     url: '/auth/refresh',
    //     method: 'POST',
    //   }),
    // }),
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
    verifyAccount: builder.mutation({
      query: verificationToken => ({
        url: `auth/verify/${verificationToken}`,
        method: 'PATCH',
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: () => ({
        url: '/auth/resendverify',
        method: 'POST',
      }),
    }),
    // Reset PW flow (four mutations)
    findUser: builder.mutation({
      query: email => ({
        url: '/auth/findUser',
        method: 'POST',
        body: { email },
      }),
    }),
    sendPwResetCode: builder.mutation({
      query: email => ({
        url: '/auth/resetPassword',
        method: 'POST',
        body: { email },
      }),
    }),
    validateResetCode: builder.mutation({
      query: userInputs => ({
        url: '/auth/validateResetCode',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
    changePassword: builder.mutation({
      query: userInputs => ({
        url: '/auth/changePassword',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
  }),
});

export const {
  useRefreshAccessTokenQuery,
  useRefreshAccessTokenMutation,

  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,

  useVerifyAccountMutation,
  useResendVerificationEmailMutation,

  useFindUserMutation,
  useSendPwResetCodeMutation,
  useValidateResetCodeMutation,
  useChangePasswordMutation,

} = authApiSlice;
