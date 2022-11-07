import { useState } from 'react';
import { DotLoader } from 'react-spinners';

import { ProfileImage } from 'components/ProfileImage';
import { EmojiSelector } from '../createPostModal/bgAndEmoji/EmojiSelector';
import { ImagePicker } from '../../../components/ui/inputs/ImagePicker';
import { useCreateCommentMutation, useUpdatePostMutation } from '../postsApiSlice';

import './CreateComment.scss';

export const CreateComment = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [commentImages, setCommentImages] = useState([]);

  const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);

  const [createComment, { isLoading: isLoadingComment }] = useCreateCommentMutation();

  // const isDisabled = commentText.length === 0 && commentImages.length === 0;

  const resetImages = () => {
    setCommentImages([]);
  };

  const handleEmojiInput = emoji => {
    setCommentText(commentText + emoji.native);
  };

  const showEmojiPicker = () => {
    setTimeout(() => {
      setEmojiSelectorVisible(!emojiSelectorVisible);
    }, 0);
  };

  const removeThumbHandler = id => {
    setCommentImages(commentImages.url.filter(image => image.id !== id));
  };

  // Submithandler --------------------------------------------------
  const submitCommentHandler = async e => {
    e.preventDefault();
    if (commentText.length === 0 && commentImages.length === 0) return;
    let commentData = new FormData();
    commentData.append('text', commentText);
    if (commentImages.length > 0) {
      for (let i = 0; i < commentImages.length; i++) {
        commentData.append('images', commentImages[i]);
      }
    }
    try {
      const { data } = await createComment({
        commentData,
        postId,
      }).unwrap();
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }

    setCommentText('');
    setCommentImages([]);
    // setVisible(false);
  };

  return isLoadingComment ? (
    <div className='dot_loader'>
      <DotLoader color='var(--red-main)' size={'2rem'} />
    </div>
  ) : (
    <form className='create_comment' onSubmit={submitCommentHandler}>
      <ImagePicker preview setImages={setCommentImages}>
        {props => (
          <>
            <div className='comment_input_row'>
              <ProfileImage size='3rem' />
              <div className='input_wrap'>
                <div className='comment_text_wrapper'>
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
                </div>
                {emojiSelectorVisible && (
                  <EmojiSelector
                    setVisible={setEmojiSelectorVisible}
                    handleInput={handleEmojiInput}
                    bottom='6rem'
                    // right='-10%'
                  />
                )}
                <div className='emoji_wrapper'>
                  <div className='comment_circle_icon hover2' onClick={showEmojiPicker}>
                    <i className='emoji_icon'></i>
                  </div>

                  <div className='comment_circle_icon hover2' onClick={props.open}>
                    <i className='camera_icon'></i>
                  </div>

                  <div className='comment_circle_icon hover2'>
                    <i className='gif_icon'></i>
                  </div>

                  <div className='comment_circle_icon hover2'>
                    <i className='sticker_icon'></i>
                  </div>
                </div>
              </div>
            </div>
            {commentImages && commentImages.length > 0 && (
              <>
                <div className='comment_image_preview'>
                  {' '}
                  <div className='image_grid'>
                    {commentImages.slice(0, 6).map(img => (
                      <div className='image_wrapper' key={img.id}>
                        <img src={img.url} alt='' />
                        <div className='small_circle' onClick={() => removeThumbHandler(img.id)}>
                          <i className='exit_icon'></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='small_circle' onClick={resetImages}>
                    <i className='exit_icon'></i>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </ImagePicker>
    </form>
  );
};
