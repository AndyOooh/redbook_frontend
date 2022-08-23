import { Posts } from 'features/posts/components/Posts';
import { CreatePost } from 'features/posts/CreatePost';
import React from 'react';
import { Photos } from '../Photos';

export const ProfilePosts = props => {
  console.log('🚀 ~ file: ProfilePosts.jsx ~ line 5 ~ ProfilePosts ~ props', props);
  return (
    <>
      <section className='profile_posts'>
        <div className='posts_left'>
          <div className='card_main intro'>
            <span className='card_title'>Intro</span>
          </div>

          <div className='card_main photos'>
            <Photos photos={props.photos} />
          </div>
        </div>
        <div className='posts_right'>
          <CreatePost />
          <div className='card_main posts_menu'>
            <span className='card_title'>Posts</span>
          </div>
          <Posts filter={props} />
        </div>
      </section>
    </>
  );
};
