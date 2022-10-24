import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import './PostItem.scss';
import { ReactionsPopup } from './ReactionsPopup';
import { Dots, Public } from 'assets/svg';
import { useHoverHandler } from 'hooks/useHoverHandler';
import { CreateComment } from './CreateComment';
import { PostMenu } from './PostMenu';
import { CommentItem } from './CommentItem';
import { ProfileImage } from 'components/ProfileImage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/auth/authSlice';

export const PostItem = memo(({ post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionsPopup, setShowReactionsPopup] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const hoverHandler = useHoverHandler();
  const userId = useSelector(selectCurrentUser).id;

  const existingReaction = post.reactions.find(reaction => reaction.user === userId);

  const emojiPath = '../../../../reacts/';

  const { user: poster, images, type } = post;

  const reactionsMap = post.reactions.reduce(
    (acc, react) => {
      if (react.type === 'like') {
        acc[0].count++;
      } else if (react.type === 'love') {
        acc[1].count++;
      } else if (react.type === 'haha') {
        acc[2].count++;
      } else if (react.type === 'wow') {
        acc[3].count++;
      } else if (react.type === 'sad') {
        acc[4].count++;
      } else if (react.type === 'angry') {
        acc[5].count++;
      }
      return acc;
    },
    [
      { type: 'like', count: 0 },
      { type: 'love', count: 0 },
      { type: 'haha', count: 0 },
      { type: 'wow', count: 0 },
      { type: 'sad', count: 0 },
      { type: 'angry', count: 0 },
    ]
  );
  const sortedReactionsMap = reactionsMap.sort((a, b) => b.count - a.count);
  const reactionsObject = {
    first: sortedReactionsMap[0].type,
    second: sortedReactionsMap[1].type,
    count: post.reactions.length,
  };
  console.log('🚀 ~ file: PostItem.jsx ~ line 56 ~ sortedReactionsMap', sortedReactionsMap);

  const updatedText =
    type === 'profile'
      ? `updated ${poster.gender === 'male' ? 'his' : 'her'} profile picture`
      : type === 'cover'
      ? `updated ${poster.gender === 'male' ? 'his' : 'her'} cover picture`
      : null;

  let gridClass;

  switch (images?.length) {
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
            {/* <Link to={`/profile/${user.username}`} className=''> */}
            <Link to={poster.username} className=''>
              <ProfileImage image={poster.pictures[0].url} />
            </Link>
            <div className='post_details'>
              <div className='profile_name'>
                {/* <Link to={`/profile/${user.username}`} className=''> */}
                <Link to={`/${poster.username}`} className=''>
                  {poster.first_name} {poster.last_name} <span>{updatedText}</span>
                </Link>
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
            <Dots color='#828387' />
          </div>
        </div>
        {showMenu && (
          <PostMenu
            posterId={poster._id}
            postId={post._id}
            imagesLength={images?.length}
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
          {type === 'profile' ? (
            <div className='profile_post'>
              <div
                className='profile_cover'
                style={{ backgroundImage: `url(${poster.covers[0].url})` }}></div>
              <img className='profile_image' src={images[0].url} alt='' />
            </div>
          ) : type === 'cover' ? (
            // <div className='cover_post'>
            //   <div
            //     className='cover_image'
            //     style={{ backgroundImage: `url(${user.covers[0].url})` }}></div>
            // </div>
            <img className='cover_image' src={poster.covers[0].url} alt='' />
          ) : (
            images?.length > 0 && (
              <div className={`post_images_grid ${gridClass}`}>
                {images?.slice(0, 4).map((image, index) => (
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
                    {index === 3 && images.length > 4 && `+${images.length - 4}`}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        {/* POST END ----------------- */}

        <div className='post_interactions'>
          <div className='reactions'>
            {/* ååå */}
            {reactionsObject.count > 0 && (
              <>
                <img
                  src={`${emojiPath}${reactionsObject.first}.svg`}
                  alt='emoji'
                  className='reaction_image'
                />
                {reactionsObject.count > 1 && (
                  <img
                    src={`${emojiPath}${reactionsObject.second}.svg`}
                    alt='emoji'
                    className='reaction_image'
                  />
                )}
                {reactionsObject.count}
              </>
            )}
          </div>

          <div className='shares_comments'>
            <div className='num_shares'>No shares</div>
            <div className='num_comments' onClick={() => setShowComments(prev => !prev)}>
              {post.comments.length < 1
                ? 'No comments'
                : reactionsObject.count === 1
                ? '1 comment'
                : `${post.comments.length} comments`}
            </div>
          </div>
        </div>

        {/* not responsive */}
        <div className='post_actions'>
          <ReactionsPopup
            postId={post._id}
            visible={showReactionsPopup}
            setVisible={setShowReactionsPopup}
          />
          <div
            className='like hover1'
            onMouseOver={() => hoverHandler(setShowReactionsPopup)}
            onMouseLeave={() => hoverHandler(setShowReactionsPopup, false)}>
            {existingReaction ? (
              <div className='emoji_like'>
                <img
                  src={`${emojiPath}${existingReaction.type}.svg`}
                  alt='emoji'
                  className='reaction_image'
                />
                <span>{existingReaction.type} </span>
              </div>
            ) : (
              <>
                <i className='like_icon'></i>
                <span>Like</span>
              </>
            )}
          </div>

          <div className='comment hover1' onClick={() => setShowComments(prev => !prev)}>
            <i className='comment_icon'></i>
            <span>Comment</span>
          </div>
          <div className='share hover1'>
            <i className='share_icon'></i>
            <span>Share</span>
          </div>
        </div>
        {/* not responsive */}

        {showComments && (
          <>
            <CreateComment postId={post._id} visible={showComments} setVisible={setShowComments} />
            {post.comments.length > 0 && (
              <div className='comments'>
                {post.comments.map(comment => (
                  <CommentItem key={comment._id} comment={comment} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
});
