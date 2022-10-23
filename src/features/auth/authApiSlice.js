import { apiSlice } from 'app/api/apiSlice';

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
  useLoginMutation,
  useLogoutMutation,
  
  useRefreshAccessTokenQuery,
  useVerifyAccountMutation,
  useResendVerificationEmailMutation,

  useFindUserMutation,
  useSendPwResetCodeMutation,
  useValidateResetCodeMutation,
  useChangePasswordMutation,
} = authApiSlice;
