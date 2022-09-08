import { ProfileImage } from 'components/ProfileImage';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { EmojiSelector } from '../createPostModal/bgAndEmoji/EmojiSelector';
import { ImagePicker } from '../../../components/ui/inputs/ImagePicker';
import { useCreateCommentMutation, useUpdatePostMutation } from '../postsApiSlice';

export const CreateComment = ({ postId, visible, setVisible }) => {

  const [commentText, setCommentText] = React.useState('');
  const [commentImages, setCommentImages] = useState([]);

  const [emojiSelectorVisible, setEmojiSelectorVisible] = React.useState(false);

  const [createComment, { isLoading: isLoadingComment }] = useCreateCommentMutation();

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
    console.log('submitCommentHandler');
    console.log('commentText', commentText);
    console.log('commentImage', commentImages);
    console.log('commentImage.length', commentImages.length);

    let commentData = new FormData();

    // postData.append('id', postId);
    commentData.append('text', commentText);
    if (commentImages.length > 0) {
      for (let i = 0; i < commentImages.length; i++) {
        commentData.append('images', commentImages[i]);
      }
    }

    // log formData
    for (var pair of commentData.entries()) {
      console.log('in for loop');
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
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
    setVisible(false);
  };

  return visible ? (
    <section className='post_comments'>
      {/* <div className='sorting'>
        <select name='' id=''>
          <option value=''>Latest</option>
          <option value=''>First</option>
          <option value=''>Most commented</option>
        </select>
      </div> */}

      {/* Create comment. CreateComment component? */}
      <form className='comment_form' onSubmit={submitCommentHandler}>
        <ImagePicker
          preview
          setImages={setCommentImages}
        >
          {props => (
            <>
              <div className='create_comment'>
                <ProfileImage size='2.4rem' />
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
                      bottom='5rem'
                      right='-20%'
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

      <div className='top_comment'></div>
      <div className='like_reply'></div>
      <div className='more'></div>
    </section>
  ) : null;
};
