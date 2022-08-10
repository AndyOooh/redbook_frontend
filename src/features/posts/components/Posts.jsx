import React, { useMemo } from 'react';
import { useGetPostsQuery } from '../postsApiSlice';

export const Posts = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('posts', posts);

  const posts2 = posts.map(post => {
    return <div key={post._id}>{post._id}</div>;
  });

  return (
    <>
      <section>
        <div className='post_header'>
          <div className='header_left'></div>
          <div className='header_right'></div>
        </div>
        <div className='post_content'>
          <div className='text'></div>
          <div className='imgages'></div>
        </div>
        <div className='post_interactions'>
          <div className='reactions'></div>
          <div className='comments_count'></div>
        </div>
        <div className='post_actions'>
          <div className='like'></div>
          <div className='comment'></div>
        </div>
        <div className='post_comments'>
          <div className='comments_settings'></div>
          <div className='comments'></div>
          <div className='like_reply'></div>
          <div className='comment_row'>
            <div className='profile_image'></div>
            <div className='comment_text'></div>
          </div>
        </div>

        <div>Posts</div>
        {posts2}
      </section>
    </>
  );
};
