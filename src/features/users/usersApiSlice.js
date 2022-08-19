import { apiSlice } from 'app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({userId, type}) => `users/${userId}?type=${type}`,
    }),
    // getProfile: builder.query({
    //   query: userId => `users/${userId}/profile`,
    // }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery } = usersApiSlice;
