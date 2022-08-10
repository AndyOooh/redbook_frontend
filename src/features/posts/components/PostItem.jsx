import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Dots, Public } from 'assets/svg';

export const PostItem = ({ post }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  console.log('post', post);

  const { user, images } = post;

  console.log('post.background truthy', post.background ? true : false);

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
    case 4:
      gridClass = 'grid_4';
      break;
    case 5:
      gridClass = 'grid_5';
      break;
    default:
      gridClass = 'grid_6';
      break;
  }

  return (
    <>
      <div className='home_card post_item'>
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
                  {post.createdAt}.
                </Moment>
                <Public color='#828387' />
              </div>
            </div>
          </div>

          <div className='header_right'>
            {/* <div
            className='post_header_right hover1'
            onClick={() => setShowMenu(prev => !prev)}></div> */}
            <Dots color='#828387' />
          </div>
        </div>

        {/* POST START ----------------- */}
        <div className='post_content'>
          <div
            className={post.background ? 'background text' : 'text'}
            style={post.background && { backgroundImage: `url(${post.background})` }}>
            {post.text}
          </div>
          {post.images && post.images.length > 0 && (
            <div className={`post_images_grid ${gridClass}`}>
              {post.images.slice(0, 5).map(image => (
                <img src={image.url} key={image.id} alt='' className='grid_item' />
              ))}
              {post.images.length > 5 && (
                <div className='more-pics-shadow'>+{post.images.length - 5} </div>
              )}
            </div>
          )}
        </div>
        {/* POST END ----------------- */}

        <div className='post_interactions'>
          <div className='reactions'></div>
          <div className='comments_count'></div>
        </div>
        <div className='post_actions'>
          <div className='like'></div>
          <div className='comment'></div>
        </div>
        <div className='post_comments'>
          <div className='comments_settings'></div>
          <div className='comments'></div>
          <div className='like_reply'></div>
          <div className='comment_row'>
            <div className='profile_image'></div>
            <div className='comment_text'></div>
          </div>
        </div>
      </div>
    </>
  );
};
