import { PostsArray } from 'features/posts/components/PostsArray';
import { CreatePost } from 'features/posts/CreatePost';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';
import { useContext } from 'react';
import { Photos } from '../photos/Photos';
import { Intro } from './Intro/Intro';

export const ProfilePosts = () => {
  const { visitor, profileUser } = useContext(ProfileContext);

  return (
    <>
      <section className='profile_posts'>
        <div className='posts_left'>
          <Intro />
          <Photos />
        </div>
        <div className='posts_right'>
          {!visitor && <CreatePost />}
          <div className='card_main posts_menu'>
            <span className='card_title'>Posts</span>
          </div>
          <PostsArray filter={{ user: profileUser.id }} />
        </div>
      </section>
    </>
  );
};
