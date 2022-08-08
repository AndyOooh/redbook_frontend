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

    // getPosts: builder.get('/posts'),
    // getPost: builder.get('/posts/:id'),
    // updatePost: builder.put('/posts/:id'),
    // deletePost: builder.delete('/posts/:id'),
  }),
});

export const { useCreatePostMutation } = postsApiSlice;
