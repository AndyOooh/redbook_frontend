import Picker from '@emoji-mart/react';

export const EmojiSelector = ({ setVisible, handleInput, bottom = 0, right = 0 }) => {
  const styles = `em-emoji-picker {
    position: absolute;
    z-index: 200;
    max-height: 20vh;
    bottom: ${bottom};
    right: ${right};
    --category-icon-size: 1.8rem;
    --font-size: 1.2rem;

    box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.1);

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
