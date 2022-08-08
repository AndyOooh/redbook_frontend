import { useState } from 'react';
import { VscSmiley } from 'react-icons/vsc';
import { BackgroundSelector } from './BackgroundSelector';
import { EmojiSelector } from './EmojiSelector';

export const BgAndEmojiSelectors = ({
  imagePickerVisible,
  //   postBackgrounds,
  changeBackgroundHandler,
  // handleEmojiInput,
  setPost,
  post,
}) => {
  const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);

  const handleEmojiInput = emoji => {
    setPost(post + emoji.native);
  };

  const showEmojiPicker = () => {
    // without the timeout, clockoutsideHandler will trigger whule emojiPickerVisible is true
    setTimeout(() => {
      setEmojiSelectorVisible(!emojiSelectorVisible);
    }, 0);
  };

  return (
    <>
      {emojiSelectorVisible && (
        <EmojiSelector
          setEmojiPickerVisible={setEmojiSelectorVisible}
          handleEmojiInput={handleEmojiInput}
          imagePickerVisible={imagePickerVisible}
        />
      )}

      {imagePickerVisible ? (
        <div className='bg_emoji_wrapper' style={{ height: 0, marginBottom: '-1rem' }}>
          <div className='invisible'></div>
          <div className='emoji_opener push_up' onClick={showEmojiPicker}>
            <VscSmiley />
          </div>
        </div>
      ) : (
        <div className='bg_emoji_wrapper'>
          <BackgroundSelector changeBackground={changeBackgroundHandler} />
          <div className='emoji_opener' onClick={showEmojiPicker}>
            <VscSmiley />
          </div>
        </div>
      )}
    </>
  );
};
