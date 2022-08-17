import { apiSlice } from 'app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: userId => `users/${userId}`,
    }),
  }),
});

export const { useGetUserQuery } = usersApiSlice;
