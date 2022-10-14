import { useState } from 'react';
import { useSelector } from 'react-redux';

import './PostMenu.scss';
import { useClickOutside } from 'hooks/useClickOutside';
import { PostMenuItem } from './PostMenuItem';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useDeletePostMutation } from '../postsApiSlice';
import { isOutOfViewport } from 'utils/isOutOfView';

export const PostMenu = ({ posterId, postId, imagesLength, setVisible }) => {
  const user = useSelector(selectCurrentUser);
  const [postMenuref, setPostMenuref] = useState(null);
  useClickOutside(postMenuref, () => setVisible(false));

  const isAuthor = posterId === user.id;

  //Not in use. Can use to place Postmenu differently when out of viewport. Note: using callbak ref.
  let outOfView;
  if (postMenuref !== null) {
    outOfView = isOutOfViewport(postMenuref).any;
    console.log('🚀 outOfView.any: ', outOfView);
  }

  const [deletPost, { isLoading, isSuccess, error }] = useDeletePostMutation();
  const handleDeletePost = postId => {
    console.log('deleting post:', postId);
    deletPost(postId);
    return;
  };

  return (
    <ul
      className='post_menu'
      ref={node => {
        setPostMenuref(node);
      }}>
      {isAuthor && <PostMenuItem icon='pin_icon' title='Pin Post' />}
      <PostMenuItem icon='save_icon' title='Save Post' subtitle='Add this to your saved items.' />
      <div className='line'></div>
      {isAuthor && <PostMenuItem icon='edit_icon' title='Edit Post' />}

      {!isAuthor && (
        <PostMenuItem icon='turnOnNotification_icon' title='Turn on notifications for this post' />
      )}
      {imagesLength > 0 && <PostMenuItem icon='edit_icon' title='Download' />}
      {imagesLength > 0 && <PostMenuItem icon='download_icon' title='Download' />}
      {imagesLength > 0 && <PostMenuItem icon='fullscreen_icon' title='Enter Fullscreen' />}
      {isAuthor && (
        <>
          <PostMenuItem img='../../../icons/lock.png' title='Edit audience' />
          <PostMenuItem
            icon='turnOffNotifications_icon'
            title='Turn off notifications for this post'
          />
          <PostMenuItem icon='delete_icon' title='Turn off translations' />
          <PostMenuItem icon='date_icon' title='Edit Date' />
          <PostMenuItem icon='refresh_icon' title='Refresh share attachment' />
          <PostMenuItem icon='archive_icon' title='Move to archive' />
          <PostMenuItem
            icon='trash_icon'
            title='Move to trash'
            subtitle='items in your trash are deleted after 30 days'
            postId={postId}
            clickHandler={handleDeletePost}
          />
        </>
      )}
      {!isAuthor && (
        <>
          <div className='line'></div>
          <PostMenuItem
            img='../../../icons/report.png'
            title='Report post'
            subtitle="i'm concerned about this post"
            clickHandler={() => alert('you are naughty')}
          />
        </>
      )}
    </ul>
  );
};
