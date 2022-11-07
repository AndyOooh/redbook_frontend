import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useState } from 'react';

import './CommentItem.scss';
import { ProfileImage } from 'components/ProfileImage';
import { Dots } from 'assets/svg';
import { useDeleteCommentMutation } from '../postsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/auth/authSlice';

export const CommentItem = ({ comment, clickHandler, commentId, postId }) => {
  const currentUser = useSelector(selectCurrentUser);
  const commentor = comment.user;

  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [deleteComment, { isLoading: loadingDeleteComment }] = useDeleteCommentMutation();

  return (
    // <div className='comment_item' key={comment.id} onClick={() => clickHandler(commentId)}>
    <div className='comment_item' key={comment.id}>
      <ProfileImage size='3rem' image={commentor.pictures[0].url} />
      <div className='comment'>
        <Link to={`/profile/${commentor?._id}`} className=''>
          <span className='commentor'>
            {commentor?.first_name} {commentor?.last_name}
          </span>
        </Link>
        <div>
          <span className='comment_text'>{comment.text}</span>
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
      {commentor._id === currentUser.id ? (
        <div className='comment_dots' onClick={() => setShowCommentMenu(prev => !prev)}>
          <Dots />
          {showCommentMenu && (
            <div className='comment_menu card_main'>
              <div className='comment_menu_item'>Edit</div>
              <div
                className='comment_menu_item'
                onClick={() => deleteComment({ postId: postId, commentId: comment._id })}>
                Delete
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='empty_div'></div>
      )}

      <div className='empty_div'></div>
      <div className='comment_actions'>
        <span>Like</span>
        <span>Reply</span>
        <span>
          <Moment fromNow interval={30}>
            {comment.createdAt}
          </Moment>
        </span>
      </div>
    </div>
  );
  // );
};
