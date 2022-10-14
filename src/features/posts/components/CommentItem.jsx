import { Link } from 'react-router-dom';

import { ProfileImage } from 'components/ProfileImage';
import './PostComment.scss';

export const CommentItem = ({ comment, clickHandler, commentId }) => {
  const commentor = comment.commentBy;

  return (
    <div className='comment_item' key={comment.id} onClick={() => clickHandler(commentId)} >
      <div className='comment_row'>
        <ProfileImage size='2.4rem' image={commentor.pictures[0].url} />
        <div className='comment_box'>
          <div>
            <Link to={`/profile/${commentor?._id}`} className=''>
              <span className='user_names'>
                {commentor?.first_name} {commentor?.last_name}
              </span>
            </Link>
          </div>
          <span className='comment'>{comment.text}</span>
          {comment.images > 0 && (
            <div className='images_row'>
              {comment.images.length > 0 && (
                <div className='comment_images'>
                  {comment.images.map(image => (
                    <img src={image.url} alt='' key={image._id} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // );
};
