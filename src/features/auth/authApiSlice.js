import { apiSlice } from 'app/api/apiSlice';
import authService from './[old]authService';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refreshAccessToken: builder.query({
      query: () => '/refresh',
    }),

    login: builder.mutation({
      query: userInputs => ({
        url: '/login',
        method: 'POST',
        body: { ...userInputs },
      }),
      invalidatesTags: ['UserTag'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['UserTag'],
    }),
    // register: builder.mutation({
    //   query: userInputs => ({
    //     url: '/users',
    //     method: 'POST',
    //     body: { ...userInputs },
    //   }),
    //   invalidatesTags: ['UserTag'],
    // }),
    verifyAccount: builder.mutation({
      query: verificationToken => ({
        url: `verify/${verificationToken}`,
        method: 'PATCH',
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: () => ({
        url: '/resendverify',
        method: 'POST',
      }),
    }),
    // Reset PW flow (four mutations)
    findUser: builder.mutation({
      query: email => ({
        url: '/findUser',
        method: 'POST',
        body: { email },
      }),
    }),
    sendPwResetCode: builder.mutation({
      query: email => ({
        url: '/resetPassword',
        method: 'POST',
        body: { email },
      }),
    }),
    validateResetCode: builder.mutation({
      query: userInputs => ({
        url: '/validateResetCode',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
    changePassword: builder.mutation({
      query: userInputs => ({
        url: '/changePassword',
        method: 'POST',
        body: { ...userInputs },
      }),
    }),
  }),
});

export const {
  useRefreshAccessTokenQuery,

  useLoginMutation,
  useLogoutMutation,
  // useRegisterMutation,

  useVerifyAccountMutation,
  useResendVerificationEmailMutation,

  useFindUserMutation,
  useSendPwResetCodeMutation,
  useValidateResetCodeMutation,
  useChangePasswordMutation,
} = authApiSlice;
