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
    // updatedUserDetails: builder.mutation({
    //   query: ({ postData, userId, field }) => ({
    //     url: `/users/${userId}/update?field=${field}`,
    //     method: 'PUT',
    //     body: postData,
    //   }),
    // }),
    updateUserDetails: builder.mutation({
      query: ({ postData, userId, field }) => {
        console.log('in updatedUserDetails: ', field);
        return {
          url: `/users/${userId}/update?field=${field}`,
          method: 'PUT',
          body: postData,
        };
      },
    }),

    updateProfileImages: builder.mutation({
      query: payload => {
        console.log('postData in usersApiSlice -----------------: ', payload);
        const { postData, userId, type } = payload;
        return {
          url: `/users/${userId}/update-images?type=${type}`,
          method: 'PUT',
          body: postData,
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateProfileImagesMutation,
  useUpdateUserDetailsMutation,
} = usersApiSlice;
