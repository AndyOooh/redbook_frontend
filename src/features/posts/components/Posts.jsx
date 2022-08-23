import React, { useMemo } from 'react';
import { useGetPostsQuery } from '../postsApiSlice';
import { PostItem } from './PostItem';

import './Posts.scss';

export const Posts = ({filter}) => {
  console.log('Posts filter', filter);
  const { data: posts = [], isLoading, error } = useGetPostsQuery(filter);

  return (
    <>
      <section>
        {posts.slice(0, 5).map(post => {
          return <PostItem key={post._id} post={post} />;
        })}
      </section>
    </>
  );
};
