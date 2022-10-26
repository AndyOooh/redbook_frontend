import { Link } from 'react-router-dom';

import { ProfileImage } from 'components/ProfileImage';
import './CommentItem.scss';

import { Dots } from 'assets/svg';
import { useState } from 'react';
import Moment from 'react-moment';
import { useDeleteCommentMutation } from '../postsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/auth/authSlice';

export const CommentItem = ({ comment, clickHandler, commentId, postId }) => {
  const user = useSelector(selectCurrentUser);
  console.log('🚀 ~ file: CommentItem.jsx ~ line 15 ~ user', user.id);
  const commentor = comment.commentBy;

  const [showCommentMenu, setShowCommentMenu] = useState(true);
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
      {commentor._id === user.id ? (
        <div className='comment_dots' onClick={prev => setShowCommentMenu(!prev)}>
          <Dots />
          {showCommentMenu && (
            <div className='comment_menu card_main'>
              <div className='comment_menu_item'>Edit</div>
              <div
                className='comment_menu_item'
                onClick={() => deleteComment({ postId: postId, commentId: comment.id })}>
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
            {comment.commentAt}
          </Moment>
        </span>
      </div>
    </div>
  );
  // );
};
