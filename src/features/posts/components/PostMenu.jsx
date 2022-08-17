import { useClickOutside } from 'hooks/useClickOutside';
import { useRef, useState } from 'react';

import { PostMenuItem } from './PostMenuItem';

import './PostMenu.scss';


export const PostMenu = ({ postUserId, userId, imagesLength, setVisible }) => {
  // const [isAuthor, setIsAuthor] = useState(postUserId === userId ? true : false);
  const isAuthor = postUserId === userId;

  const menu = useRef(null);
  useClickOutside(menu, () => setVisible(false));

  return (
    <ul className='post_menu' ref={menu}>
      {isAuthor && <PostMenuItem icon='pin_icon' title='Pin Post' />}
      <PostMenuItem icon='save_icon' title='Save Post' subtitle='Add this to your saved items.' />
      <div className='line'></div>
      {isAuthor && <PostMenuItem icon='edit_icon' title='Edit Post' />}
      {!isAuthor && (
        <PostMenuItem icon='turnOnNotification_icon' title='Turn on notifications for this post' />
      )}
      {imagesLength && <PostMenuItem icon='download_icon' title='Download' />}
      {imagesLength && <PostMenuItem icon='fullscreen_icon' title='Enter Fullscreen' />}
      {isAuthor && <PostMenuItem img='../../../icons/lock.png' title='Edit audience' />}
      {isAuthor && (
        <PostMenuItem
          icon='turnOffNotifications_icon'
          title='Turn off notifications for this post'
        />
      )}
      {isAuthor && <PostMenuItem icon='delete_icon' title='Turn off translations' />}
      {isAuthor && <PostMenuItem icon='date_icon' title='Edit Date' />}
      {isAuthor && <PostMenuItem icon='refresh_icon' title='Refresh share attachment' />}
      {isAuthor && <PostMenuItem icon='archive_icon' title='Move to archive' />}
      {isAuthor && (
        <PostMenuItem
          icon='trash_icon'
          title='Move to trash'
          subtitle='items in your trash are deleted after 30 days'
        />
      )}
      {!isAuthor && <div className='line'></div>}
      {!isAuthor && (
        <PostMenuItem
          img='../../../icons/report.png'
          title='Report post'
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
};
