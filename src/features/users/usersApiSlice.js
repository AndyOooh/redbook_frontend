import { apiSlice } from 'app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ userId, type }) => `users/${userId}?type=${type}`,
      providesTags: ['UserTag'],
    }),
    updateUserDetails: builder.mutation({
      query: ({ postData, userId, path }) => {
        console.log('in updatedUserDetails: ', path);
        return {
          url: `/users/${userId}/update?path=${path}`,
          method: 'PUT',
          body: postData,
        };
      },
      invalidatesTags: ['UserTag'],
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
      invalidatesTags: ['UserTag'],
    }),
    friendRequest: builder.mutation({
      query: payload => {
        const { receiverId, type } = payload;
        console.log('🚀 ~ file: usersApiSlice.js ~ line 49 ~ receiver', receiverId);
        return {
          url: `/users/friendRequest?type=${type}`,
          method: 'PUT',
          body: receiverId,
        };
      },
      invalidatesTags: ['UserTag'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateProfileImagesMutation,
  useUpdateUserDetailsMutation,
  // useSendFriendRequestMutation,
  useFriendRequestMutation,
} = usersApiSlice;
