import { apiSlice } from 'app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => 'auth/users',
    }),
    getUser: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: userId => `auth/users/${userId}`,
    }),
    registerUser: builder.mutation({
      // query: () => {url: '/auth/register', method: 'POST', body: newPost},
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useRegisterUserMutation } = authApiSlice;
