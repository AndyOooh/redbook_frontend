import React, { useMemo } from 'react';
import { useGetPostsQuery } from '../postsApiSlice';
import { PostItem } from './PostItem';

import './Posts.scss';

export const Posts = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('posts', posts);

  return (
    <>
      {/* <section className='home_card'> */}
      <section>
        {posts.map(post => {
          return <PostItem post={post} />;
        })}
      </section>
    </>
  );
};
