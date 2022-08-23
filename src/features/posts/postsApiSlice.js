import { apiSlice } from 'app/api/apiSlice';
// import authService from './[old]authService';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: postData => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),
    getPosts: builder.query({
      // query: filter => `/posts?${filter}`,
      query: filter => {
        return {
          url: '/posts',
          params: { ...filter },
          
        };
      },
    }),
    createComment: builder.mutation({
      query: comment => {
        console.log('lalaaaaa-----------------: ', comment);
        const { commentData, postId } = comment;
        console.log('commentData: ', commentData);
        console.log('postId: ', postId);
        // url: `/posts/${postId}`,
        return {
          url: '/posts/' + postId,
          method: 'PUT',
          body: commentData,
        };
      },
    }),

    // getPost: builder.get('/posts/:id'),
    // updatePost: builder.put('/posts/:id'),
    // deletePost: builder.delete('/posts/:id'),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useCreateCommentMutation } = postsApiSlice;
