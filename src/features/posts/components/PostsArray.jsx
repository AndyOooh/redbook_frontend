import { useGetPostsQuery } from '../postsApiSlice';
import { PostItem } from './PostItem';

export const PostsArray = ({ filter }) => {
  // filter should be an object similar to {user: user.id}, where id corresponds to the user id in MongoDb.
  const { data: posts = [], isLoading, error } = useGetPostsQuery(filter);
  return (
    <>
      <section>
        {posts.map(post => {
          return <PostItem key={post._id} post={post} />;
        })}
      </section>
    </>
  );
};
