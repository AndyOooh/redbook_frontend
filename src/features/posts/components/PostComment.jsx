import { useGetUserQuery } from 'features/users/usersApiSlice';
import { Link } from 'react-router-dom';

import './PostComment.scss';

export const PostComment = ({ comment }) => {
  console.log('comment...................', comment);
  const { data: user, isLoading, error } = useGetUserQuery(comment.commentBy);

  if (error) {
    console.log('error in useGetUserQuery: ', error);
  }

  console.log('user in PostComment', user);

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className='comment_item' key={comment.id}>
      <div className='comment_row'>
        <img  src={user?.picture} alt='' className='profile_pic' />
        <div className='comment_box'>
          <div>
            <Link to={`/profile/${user?._id}`} className=''>
              <span className='user_names'>
                {user?.first_name} {user?.last_name}
              </span>
            </Link>
          </div>
          <span className='comment'>{comment.text}</span>
          <div className='images_row'>
            {comment.images.length > 0 && (
              <div className='comment_images'>
                {comment.images.map(image => (
                  <img src={image.url} alt='' key={image.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
