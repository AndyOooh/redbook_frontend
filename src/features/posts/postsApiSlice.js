import { apiSlice } from 'app/api/apiSlice';
// import authService from './[old]authService';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: payload => {
        const { postData, type } = payload;
        return {
          url: `/posts?type=${type}`,
          method: 'POST',
          body: postData,
        };
      },
      invalidatesTags: ['PostsTag'],
    }),
    deletePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PostsTag'],
    }),
    getPosts: builder.query({
      // query: filter => `/posts?${filter}`,
      query: filter => {
        return {
          url: '/posts',
          params: { ...filter },
        };
      },
      providesTags: ['PostsTag'],
    }),
    createComment: builder.mutation({
      query: comment => {
        const { commentData, postId } = comment;
        // url: `/posts/${postId}`,
        return {
          url: '/posts/' + postId,
          method: 'PUT',
          body: commentData,
        };
      },
      invalidatesTags: ['PostsTag'],
    }),
    deleteComment: builder.mutation({
      query: comment => {
        const { commentId, postId } = comment;
        return {
          url: `/posts/${postId}?comment=${commentId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['PostsTag'],
    }),

    // getPost: builder.get('/posts/:id'),
    // updatePost: builder.put('/posts/:id'),
    // deletePost: builder.delete('/posts/:id'),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useCreateCommentMutation,
} = postsApiSlice;
