import { Posts } from 'features/posts/components/Posts';
import { CreatePost } from 'features/posts/CreatePost';
import { Photos } from '../Photos/Photos';
import { Intro } from './Intro/Intro';

export const ProfilePosts = props => {
  return (
    <>
      <section className='profile_posts'>
        <div className='posts_left'>
          <Intro user={props.user} visitor={props.visitor} />
          <Photos photos={props.photos} />
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
