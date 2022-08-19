import { CreatePost } from 'features/posts/CreatePost';
import React from 'react';

export const Posts = () => {
  return (
    <>
      <section className='posts'>
        <div className='posts_left'>
          <div className='profile_card intro'>
            <span className='card_title'>Intro</span>
          </div>

          <div className='profile_card photos'>
            <span className='card_title'>Photos</span>
          </div>
        </div>
        <div className='posts_right'>
          <CreatePost />
          <div className='profile_card posts_menu'>
            <span className='card_title'>Posts</span>
          </div>
          <div className='profile_card posts_list'>
            <span className='card_title'>Posts List -- delete</span>
          </div>
        </div>
      </section>
    </>
  );
};
