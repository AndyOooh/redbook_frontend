import { useSelector } from 'react-redux';

export const PostTextarea = ({ imagePickerVisible, bgRef, post, setPost }) => {
  const { user } = useSelector(state => state.auth);

  const handlePostInput = e => {
    setPost(e.target.value);
  };

  const textareaPlaceholder = `What's on your mind, ${user.first_name} ?`;

  let fontSize;
  let numRows;

  if (imagePickerVisible) {
    fontSize = '1.2rem';
    numRows = '2';
  } else {
    fontSize = '2.4rem';
    numRows = '3';
  }

  return (
    <>
      <label htmlFor='post_text' />
      <textarea
        style={{ fontSize: fontSize }}
        ref={bgRef}
        name='post_text'
        id='post_text'
        rows={numRows}
        value={post}
        onChange={handlePostInput}
        placeholder={textareaPlaceholder}
      />
    </>
  );
};
