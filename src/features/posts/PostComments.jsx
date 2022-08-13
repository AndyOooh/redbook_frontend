import { ProfileImage } from 'components/ProfileImage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EmojiSelector } from './createPostModal/bgAndEmoji/EmojiSelector';
import { ImagePicker } from './createPostModal/ImagePicker';

export const PostComments = ({ visible, setVisible }) => {
  const { user } = useSelector(state => state.auth);

  const [commentText, setCommentText] = React.useState('');
  const [commentImage, setCommentImage] = useState('');
  const [postImages, setPostImages] = useState([]);

  const [emojiSelectorVisible, setEmojiSelectorVisible] = React.useState(false);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const handleEmojiInput = emoji => {
    setCommentText(commentText + emoji.native);
  };

  const showEmojiPicker = () => {
    setTimeout(() => {
      setEmojiSelectorVisible(!emojiSelectorVisible);
    }, 0);
  };

  return visible ? (
    <section className='post_comments'>
      <div className='sorting'></div>
      <div className='create_comment'>
        {/* <img src={user?.picture} alt='' /> */}
        <ProfileImage size='2.4rem' />
        <label htmlFor='comment_text' />
        <input
          type='text'
          className='comment_text hover2'
          placeholder='Write a comment...'
          id='comment_text'
          name='comment_text'
          value={commentText}
          spellCheck='false'
          onChange={e => setCommentText(e.target.value)}
        />
        {emojiSelectorVisible && (
          <EmojiSelector
            setVisible={setEmojiSelectorVisible}
            handleInput={handleEmojiInput}
            bottom='5rem'
            left='38.3rem'
          />
        )}
        {imagePickerVisible && (
          <ImagePicker setImages={setPostImages} setVisible={setImagePickerVisible} />
        )}

        <div className='comment_circle_icon hover2' onClick={showEmojiPicker}>
          <i className='emoji_icon'></i>
        </div>

        <div
          className='comment_circle_icon hover2'
          // onClick={() => imgInput.current.click()}
          onClick={() => setImagePickerVisible(prev => !prev)}>
          <i className='camera_icon'></i>
        </div>

        <div className='comment_circle_icon hover2'>
          <i className='gif_icon'></i>
        </div>

        <div className='comment_circle_icon hover2'>
          <i className='sticker_icon'></i>
        </div>
      </div>

      <div className='top_comment'></div>
      <div className='like_reply'></div>
      <div className='more'></div>
    </section>
  ) : null;
};
