import { useState } from 'react';
import { VscSmiley } from 'react-icons/vsc';
import { BackgroundSelector } from './BackgroundSelector';
import { EmojiSelector } from './EmojiSelector';

export const BgAndEmojiSelectors = ({ imagePickerVisible, setPost, post }) => {
  const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);

  const handleEmojiInput = emoji => {
    setPost(post + emoji.native);
  };

  const showEmojiPicker = () => {
    // without the timeout, clockoutsideHandler will trigger while emojiPickerVisible is true
    setTimeout(() => {
      setEmojiSelectorVisible(!emojiSelectorVisible);
    }, 0);
  };

  let wrapperClasses;
  let emojiSelectorPosition = {};

  if (imagePickerVisible) {
    wrapperClasses = 'bg_emoji_wrapper hideWrapper';
    emojiSelectorPosition = { right: '-10%', bottom: '17rem' };
  } else {
    wrapperClasses = 'bg_emoji_wrapper ';
    emojiSelectorPosition = { right: '-10%', bottom: '17rem' };
  }

  return (
    <>
      <div className={wrapperClasses}>
        <BackgroundSelector />
        <div
          className='emoji_opener push_up'
          onClick={showEmojiPicker}>
          <VscSmiley />
        </div>
        {emojiSelectorVisible && (
          <EmojiSelector
            setVisible={setEmojiSelectorVisible}
            handleInput={handleEmojiInput}
            imagePickerVisible={imagePickerVisible}
            {...emojiSelectorPosition}
          />
        )}
      </div>
    </>
  );
};
