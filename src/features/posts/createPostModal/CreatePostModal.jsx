import { Modal } from 'components';
import { useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';

import './CreatePostModal.scss';
import { AddToPost } from './AddToPost';
import { ImagePicker } from './ImagePicker';
import { PostModalheader } from './PostModalheader';
import { PostTextarea } from './PostTextarea';
import { PostModalUser } from './PostModalUser';
import { BgAndEmojiSelectors } from './bgAndEmoji/BgAndEmojiSelectors';
import { useCreatePostMutation } from '../postsApiSlice';
import { ImagePickerUI } from './ImagePickerUI';

// TODO:
// Add Yup validation and error messages. Text shuod be required. Use the yup formIsvalid from elsewhere <-- use to enable/disable submit button.
export const CreatePostModal = ({ visible, setVisible }) => {
  const bgRef = useRef();

  const [postText, setPostText] = useState(''); // Set post here ------------------
  const [postBackground, setPostBackground] = useState(null);
  const [postImages, setPostImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const [createPost, { isLoading }] = useCreatePostMutation();

  console.log('text', postText);
  console.log('background', postBackground);
  console.log('images', postImages);
  console.log('previewImages', previewImages);

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

  const resetImagePicker = () => {
    setPreviewImages([]);
    setPostImages([]);
    setImagePickerVisible(false);
  };

  const changeBackgroundHandler = i => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setPostBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };

  const submitPostHandler = async e => {
    e.preventDefault();

    let postData = new FormData();

    postData.append('text', postText);
    postData.append('background', postBackground);
    for (let i = 0; i < postImages.length; i++) {
      postData.append('images', postImages[i]);
    }

    // log formData
    for (var pair of postData.entries()) {
      console.log('in for loop');
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }

    try {
      const { data } = await createPost(postData).unwrap();
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }

    setPostText('');
    setPostBackground(null);
    setPostImages([]);
    setPreviewImages([]);
    setVisible(false);
  };

  return (
    <>
      <Modal className='create_post_modal' visible={visible} setVisible={setVisible}>
        <form className='card_main modal_wrapper' onSubmit={submitPostHandler}>
          <PostModalheader setModalVisiable={setVisible} />
          <div className='vert_line'></div>
          <div className='modal_bottom'>
            <PostModalUser />
            <PostTextarea
              // setImagePickerVisible={setImagePickerVisible}
              imagePickerVisible={imagePickerVisible}
              bgRef={bgRef}
              post={postText}
              setPost={setPostText}
            />
            {/* INssrt bg emoji picker component OR NOT */}
            <BgAndEmojiSelectors
              imagePickerVisible={imagePickerVisible}
              postBackgrounds={postBackgrounds}
              post={postText}
              setPost={setPostText}
              // handleEmojiInput={handleEmojiInput}
              // showEmojiPicker={showEmojiPicker}
              changeBackground={changeBackgroundHandler}
            />
            {imagePickerVisible && (
              <ImagePicker setImages={setPostImages} setPreviewImages={setPreviewImages}>
                {props => (
                  <ImagePickerUI
                    previewImages={previewImages}
                    resetImagePicker={resetImagePicker}
                    openSystemUi={props.open}
                    error={props.error}
                    setError={props.setError}
                  />
                )}
              </ImagePicker>
            )}
            <AddToPost setVisible={setImagePickerVisible} />

            <button className='btn red_btn post_submit' type='submit' disabled={isLoading}>
              {isLoading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
