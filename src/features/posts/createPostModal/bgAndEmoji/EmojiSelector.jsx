// import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export const EmojiSelector = ({ setEmojiPickerVisible, handleEmojiInput, imagePickerVisible }) => {
  return (
    <div className={imagePickerVisible ? 'emojis_bot' : 'emojis_top'}>
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
        style={{ position: 'absolute', bottom: '200px', right: '-20px' }}

        // set={['facebook']}
        // set='facebook'
        // set={'twitter'}
        // emojiButtonColors={['#ffb6c1', '#ffb6c1', '#ffb6c1']}
        // noCountryFlags={false}
      />
    </div>
  );
};
