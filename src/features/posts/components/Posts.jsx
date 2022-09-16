import { useGetPostsQuery } from '../postsApiSlice';
import { PostItem } from './PostItem';

export const Posts = ({ filter }) => {
  // filter should be an object simialr to {user: user._id}, where _id corresponds to the user id in MongoDb.
  console.log('Posts filter', filter);
  const { data: posts = [], isLoading, error } = useGetPostsQuery(filter);
  console.log('🚀 ~ file: Posts.jsx ~ line 7 ~ posts', posts)

  return (
    <>
      <section>
        {/* turned off slice because it limited posts on Home but mighth need it for Profile page */}
        {/* {posts.slice(0, 5).map(post => { */}
        {posts.map(post => {
          // maybe should put crda_main div here instead of on postItem
          return <PostItem key={post._id} post={post} />;
        })}
      </section>
    </>
  );
};
