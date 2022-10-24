import { Link } from 'react-router-dom';

import { ProfileImage } from 'components/ProfileImage';
import './PostComment.scss';
import { Dots } from 'assets/svg';
import { useState } from 'react';
import Moment from 'react-moment';

export const CommentItem = ({ comment, clickHandler, commentId }) => {
  const commentor = comment.commentBy;
  const [showCommentMenu, setShowCommentMenu] = useState(false);

  return (
    // <div className='comment_item' key={comment.id} onClick={() => clickHandler(commentId)}>
    <div className='comment_item' key={comment.id}>
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
        <div className='comment_menu' onClick={prev => setShowCommentMenu(!prev)}>
          <Dots />
        </div>
        {showCommentMenu && <div className='comment_menu_dropdown'>lkdadjasd</div>}
      </div>
      <div className="comment_actions">
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
