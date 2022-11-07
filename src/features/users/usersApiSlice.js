import { apiSlice } from 'app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ userId, type }) => `users/${userId}?type=${type}`,
      providesTags: ['UserTag'],
    }),

    registerUser: builder.mutation({
      query: userInputs => ({
        url: '/users',
        method: 'POST',
        body: { ...userInputs },
      }),
      invalidatesTags: ['UserTag'],
    }),
    updateUser: builder.mutation({
      query: ({ payload, userId, path, isArray }) => {
        console.log('🚀 ~ file: usersApiSlice.js ~ line 19 ~ payload', payload);
        console.log('🚀 ~ file: usersApiSlice.js ~ line 19 ~ userId', userId);
        // console.log('🚀 ~ file: usersApiSlice.js ~ line 19 ~ path', path);
        // const pathString = path ? `path=${path}` : '';
        // const isArrrayString = isArray ? `isArray=${isArray}` : '';
        return {
          // url: `/users/${userId}?${path}${isArrrayString}`,
          url: `/users/${userId}?path=${path}&isArray=${isArray}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['UserTag'],
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserTag', 'PostsTag'],
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
    searchUserName: builder.query({
      query: searchTerm => `users/search?term=${searchTerm}`,
    }),
    // getUsers: builder.query({
    //   query: ({ queryString }) => `users?${queryString}`,
    // }),
    getUsers: builder.query({
      query: queryObject => {
        console.log('🚀 ~ file: usersApiSlice.js ~ line 73 ~ queryObject', queryObject)
        const queryString = Object.keys(queryObject)
          .map(key => key + '=' + queryObject[key])
          .join('&');
        console.log('🚀 ~ file: usersApiSlice.js ~ line 75 ~ queryString', queryString);
        return `users?${queryString}`;
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useSearchUsersQuery,
  useLazySearchUserNameQuery,

  useLazyGetUsersQuery,


  useUpdateProfileImagesMutation,
  useFriendRequestMutation,
} = usersApiSlice;
