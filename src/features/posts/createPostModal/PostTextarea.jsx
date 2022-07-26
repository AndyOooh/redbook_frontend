import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

export const PostTextarea = ({ imagePickerVisible, bgRef, post, setPost }) => {
  const currentUser = useSelector(selectCurrentUser);

  const handlePostInput = e => {
    setPost(e.target.value);
  };

  const textareaPlaceholder = `What's on your mind, ${currentUser.first_name} ?`;

  let fontSize;
  let numRows;

  if (imagePickerVisible) {
    fontSize = '1.6rem';
    numRows = '2';
  } else {
    fontSize = '2.4rem';
    numRows = '3';
  }

  return (
    <>
      <label htmlFor='post_text' />
      <textarea
        ref={bgRef}
        id='post_text'
        name='post_text'
        value={post}
        rows={numRows}
        placeholder={textareaPlaceholder}
        style={{ fontSize: fontSize }}
        spellCheck='false'
        onChange={handlePostInput}
        autoFocus
      />
    </>
  );
};
