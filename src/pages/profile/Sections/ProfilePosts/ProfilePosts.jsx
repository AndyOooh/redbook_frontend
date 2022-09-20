import { Posts } from 'features/posts/components/Posts';
import { CreatePost } from 'features/posts/CreatePost';
import React from 'react';
import { Photos } from '../Photos';
import { Intro } from './Intro/Intro';

export const ProfilePosts = props => {
  console.log('🚀 ~ file: ProfilePosts.jsx ~ line 8 ~ props', props);
  return (
    <>
      <section className='profile_posts'>
        <div className='posts_left'>
          <div className='card_main intro'>
            <Intro user={props.user} visitor={props.visitor} />
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
          <Posts filter={{ user: props.user.id }} />
        </div>
      </section>
    </>
  );
};
