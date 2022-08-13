import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export const EmojiSelector = ({ setVisible, handleInput, bottom = 0, right = 0 }) => {
  const styles = `em-emoji-picker {
    position: absolute;
    z-index: 200;
    max-height: 20vh;
    bottom: ${bottom};
    right: ${right};
    --category-icon-size: 1.8rem;
    --font-size: 1.2rem;

  }`;

  return (
    <>
      <style>{styles}</style>
      <Picker
        navPosition='bottom'
        previewPosition='none'
        searchPosition='none'
        maxFrequentRows={1}
        perLine={8}
        emojiButtonRadius={'10%'}
        emojiButtonSize={'36'}
        emojiSize={'30'}
        onClickOutside={() => {
          console.log('clicked outside');
          setVisible(false);
        }}
        // onClickOutside={() => setVisible(false)}
        onEmojiSelect={handleInput}
        icons='outline'
        theme='light'
      />
    </>
  );
};
