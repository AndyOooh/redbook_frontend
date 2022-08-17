import { useGetUserQuery } from 'features/users/usersApiSlice';
import { Link } from 'react-router-dom';

export const PostComment = ({ comment }) => {
  console.log('comment.commentBy: øøøøøøøøøøøøøøøø', comment.commentBy);
  const { data: user, isLoading, error } = useGetUserQuery(comment.commentBy);

  if (error) {
    console.log('error in useGetUserQuery: ', error);
  }

  console.log('user in PostComment', user);

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className='comment_item' key={comment.id}>
      <img src={user?.picture} alt='' />
      <div>
        <Link to={`/profile/${user?._id}`} className=''>
          <span>
            {user?.first_name} {user?.last_name}
          </span>
        </Link>
        <span>{comment.text}</span>
      </div>
      {comment.images > 0 && (
        <div className='comment_images'>
          {comment.images.map(image => (
            <img src={image.url} alt='' key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
};
