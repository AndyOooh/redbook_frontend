import { PostsArray } from 'features/posts/components/PostsArray';
import { CreatePost } from 'features/posts/CreatePost';
import { useGetPostsQuery } from 'features/posts/postsApiSlice';
import { Photos } from '../photos/Photos';
import { Intro } from './Intro/Intro';

export const ProfilePosts = props => {
  // filter should be an object simialr to {user: user._id}, where _id corresponds to the user id in MongoDb.
  const { data: posts = [], isLoading, error } = useGetPostsQuery({ user: props.user.id });
  console.log('🚀 ~ file: ProfilePosts.jsx ~ line 8 ~ props', props);

  return (
    <>
      <section className='profile_posts'>
        <div className='posts_left'>
          <Intro user={props.user} visitor={props.visitor} />
          {/* <Photos photos={props.user.pictures.slice(0, -1)} visitor={props.visitor} /> */}
          <Photos {...props} />
        </div>
        <div className='posts_right'>
          <CreatePost />
          <div className='card_main posts_menu'>
            <span className='card_title'>Hosts</span>
          </div>
          <PostsArray posts={posts} />
        </div>
      </section>
    </>
  );
};
