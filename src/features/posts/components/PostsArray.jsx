import { PostItem } from './PostItem';

export const PostsArray = ({ posts }) => {
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
