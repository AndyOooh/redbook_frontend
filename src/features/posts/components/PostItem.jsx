import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Dots, Public } from 'assets/svg';
import { memo, useCallback, useState } from 'react';
import { ReactionsPopup } from './ReactionsPopup';
import { useHoverHandler } from 'hooks/useHoverHandler';
import { CreateComment } from './CreateComment';
import { PostMenu } from './PostMenu';
import { PostComment } from './PostComment';

export const PostItem = memo(({ post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionsPopup, setShowReactionsPopup] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const hoverHandler = useHoverHandler();

  const { user, images } = post;

  const updatedText =
    post.type === 'profilePicture'
      ? `updated ${user.gender === 'male' ? 'his' : 'her'} profile picture`
      : post.type == 'cover'
      ? `updated ${user.gender === 'male' ? 'his' : 'her'} cover picture`
      : null;

  let gridClass;

  switch (images.length) {
    case 1:
      gridClass = 'grid_1';
      break;
    case 2:
      gridClass = 'grid_2';
      break;
    case 3:
      gridClass = 'grid_3';
      break;
    default:
      gridClass = 'grid_4';
      break;
  }

  return (
    <>
      <div className='card_main post_item'>
        <div className='post_header'>
          <div className='header_left'>
            <Link to={`/profile/${user.username}`} className=''>
              <img src={user.picture} alt='' />
            </Link>
            <div className='post_details'>
              <div className='profile_name'>
                {user.first_name} {user.last_name}
                <div className='updated_text'>{updatedText}</div>
              </div>
              <div className='privacy_date'>
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
                &middot;
                <Public color='#828387' />
              </div>
            </div>
          </div>

          <div className='header_right' onClick={() => setShowMenu(prev => !prev)}>
            {/* <div className='header_right' onClick={setTimeout(() => setShowMenu(prev => !prev), 0)}> */}
            {/* <div
            className='post_header_right hover1'
            onClick={() => setShowMenu(prev => !prev)}></div> */}
            <Dots color='#828387' />
          </div>
        </div>
        {showMenu && (
          <PostMenu
            userId={user.id}
            postUserId={post.user._id}
            imagesLength={post?.images?.length}
            setVisible={setShowMenu}
          />
        )}

        {/* POST START ----------------- */}
        <div className='post_content'>
          <div
            className={post.background ? 'background' : 'no_background'}
            style={post.background && { backgroundImage: `url(${post.background})` }}>
            {post.text}
          </div>
          {post.images && post.images.length > 0 && (
            <div className={`post_images_grid ${gridClass}`}>
              {post.images.slice(0, 4).map((image, index) => (
                <div
                  key={image.id}
                  style={
                    index === 3
                      ? {
                          backgroundImage:
                            `url(${image.url})` +
                            `, linear-gradient(rgba(0, 94, 255, 0.5), rgba(0, 94, 255, 0.5))`,
                        }
                      : { backgroundImage: `url(${image.url})` }
                  }
                  alt=''
                  className={`grid_item image${index + 1}`}>
                  {index === 3 && `+${images.length - 2}`}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* POST END ----------------- */}

        <div className='post_interactions'>
          <div className='reactions'>
            <div className='reactions'>emojis</div>
            <div className='num_reactions'> 64k</div>
          </div>
          <div className='shares_comments'>
            <div className='num_shares'>1 share</div>
            <div className='num_comments'>{post.comments.length} comments</div>
          </div>
        </div>

        <div className='post_actions'>
          <ReactionsPopup visible={showReactionsPopup} setVisible={setShowReactionsPopup} />
          <div
            className='like hover1'
            onMouseOver={() => hoverHandler(setShowReactionsPopup)}
            onMouseLeave={() => hoverHandler(setShowReactionsPopup, false)}>
            <i className='like_icon'></i>
            <span>Like</span>
          </div>

          <div className='comment hover1' onClick={() => setShowComments(prev => !prev)}>
            {/* <div className='comment hover1' onClick={setShowComments(!showComments)}> */}
            <i className='comment_icon'></i>
            <span>Comment</span>
          </div>
          <div className='share hover1'>
            <i className='share_icon'></i>
            <span>Share</span>
          </div>
        </div>

        <CreateComment postId={post._id} visible={showComments} setVisible={setShowComments} />

        {post.comments.length > 0 && (
          <div className='comments'>
            {post.comments.map(comment => (
              <PostComment key={comment._id} comment={comment} />
            ))}
          </div>
        )}

        {/* <div className='comment_header_right_top'>
                        <Link to={`/profile/${comment.user.username}`} className=''>
                          <span>{comment.user.first_name} {comment.user.last_name}</span>
                        </Link>
                        <Moment fromNow interval={30}>
                          {comment.createdAt}
                        </Moment>

                        <div className='comment_header_right_bottom'>
                          <div className='comment_header_right_bottom_left'>
                            <i className='comment_icon'></i>
                            <span>{comment.text}</span>

                            <div className='comment_header_right_bottom_right'>
                              <i className='like_icon'></i>
                              <span>Like</span>

                              <i className='comment_icon'></i>
                              <span>Reply</span>

                              <i className='share_icon'></i>
                              <span>Share</span> */}
      </div>
    </>
  );
});
