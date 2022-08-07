import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { useRef, useState } from 'react';
import { RiH1 } from 'react-icons/ri';
import { VscSmiley } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { BackgroundPicker } from './BackgroundPicker';

export const PostTextarea = ({ imagePickerVisible, setVisible: setImagePickerVisible }) => {
  const { user } = useSelector(state => state.auth);
  const bgRef = useRef();

  const [post, setPost] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [background, setBackground] = useState(null);

  const handlePostInput = e => {
    setPost(e.target.value);
  };

  const handleEmojiInput = emoji => {
    setPost(post + emoji.native);
  };

  const showEmojiPicker = () => {
    // without the timeout, clockoutsideHandler will trigger whule emojiPickerVisible is true
    setTimeout(() => {
      setEmojiPickerVisible(true);
    }, 0);
  };

  const postBackgrounds = [
    'images/postBackgrounds/1.jpg',
    'images/postBackgrounds/2.jpg',
    'images/postBackgrounds/3.jpg',
    'images/postBackgrounds/4.jpg',
    'images/postBackgrounds/5.jpg',
    'images/postBackgrounds/6.jpg',
    'images/postBackgrounds/7.jpg',
    'images/postBackgrounds/8.jpg',
    'images/postBackgrounds/9.jpg',
  ];

  const changeBackgroundHandler = i => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };

  const textareaPlaceholder = `What's on your mind, ${user.first_name} ?`;

  return (
    <>
      {emojiPickerVisible && (
        // <picker />
        <Picker
          navPosition='bottom'
          previewPosition='none'
          searchPosition='none'
          maxFrequentRows={1}
          perLine={8}
          emojiButtonRadius={'10%'}
          emojiButtonSize={'36'}
          emojiSize={'30'}
          // categories={['nature', 'foods', 'people', 'flags']}
          // data={data}
          onClickOutside={() => setEmojiPickerVisible(false)}
          onEmojiSelect={handleEmojiInput}
          icons='outline'

          // set={['facebook']}
          // set='facebook'
          // set={'twitter'}
          // style={{ position: 'absolute', bottom: '20px', right: '-20px' }}
          // emojiButtonColors={['#ffb6c1', '#ffb6c1', '#ffb6c1']}
          // noCountryFlags={false}
        />
      )}

      <>
        <textarea
          // className={imagePickerVisible ? 'post_textarea_small' : 'post_textarea'}
          style={imagePickerVisible ? { fontSize: '1.2rem' } : { fontSize: '2.4rem' }}
          ref={bgRef}
          name='post_text'
          id='post'
          rows={imagePickerVisible ? '2' : '3'}
          value={post}
          onChange={handlePostInput}
          placeholder={textareaPlaceholder}
        />

        {/* NEW Component???? */}
        {imagePickerVisible ? (
          <div className='bg_emoji_wrapper' style={{ height: 0, marginBottom: '-1rem' }}>
            <div className='invisible'></div>
            <div className='emoji_opener push_up' onClick={showEmojiPicker}>
              <VscSmiley />
            </div>
          </div>
        ) : (
          <div className='bg_emoji_wrapper'>
            <BackgroundPicker changeBackground={changeBackgroundHandler} />
            <div className='emoji_opener' onClick={showEmojiPicker}>
              <VscSmiley />
            </div>
          </div>
        )}
      </>
    </>
  );
};
