import { apiSlice } from 'app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ userId, type }) => `users/${userId}?type=${type}`,
    }),
    // getProfile: builder.query({
    //   query: userId => `users/${userId}/profile`,
    // }),
    // updateProfilePhoto: builder.mutation({
    //   query: ({postData, userId}) => ({
    //     url: `/users/${userId}/update`,
    //     method: 'PUT',
    //     body: postData,
    //   }),
    // }),
    updateProfileImages: builder.mutation({
      query: payload => {
        console.log('postData in usersApiSlice -----------------: ', payload);
        const { postData, userId, type } = payload;
        return {
          url: `/users/${userId}/update?type=${type}`,
          method: 'PUT',
          body: postData,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateProfileImagesMutation } =
  usersApiSlice;
