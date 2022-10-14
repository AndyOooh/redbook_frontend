import { useRef, useState } from 'react';
import { DotLoader } from 'react-spinners';

import './CreatePostModal.scss';
import { Modal } from 'components';
import { AddToPost } from './AddToPost';
import { ImagePicker } from '../../../components/ui/inputs/ImagePicker';
import { Modalheader } from '../../../components/ui/modal/Modalheader';
import { PostTextarea } from './PostTextarea';
import { PostModalUser } from './PostModalUser';
import { BgAndEmojiSelectors } from './bgAndEmoji/BgAndEmojiSelectors';
import { useCreatePostMutation } from '../postsApiSlice';
import { AddPhotoUi } from './AddPhotoUi';

// TODO:
// Add Yup validation and error messages. Text shuod be required. Use the yup formIsvalid from elsewhere <-- use to enable/disable submit button.
export const CreatePostModal = ({ visible, setVisible }) => {
  const bgRef = useRef();

  const [postText, setPostText] = useState(''); // Set post here ------------------
  const [postBackground, setPostBackground] = useState(null);
  const [postImages, setPostImages] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const [createPost, { isLoading }] = useCreatePostMutation();

  console.log('text', postText);
  console.log('background', postBackground);
  console.log('images', postImages);

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
    setPostImages([]);
    setImagePickerVisible(false);
  };

  const changeBackgroundHandler = i => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setPostBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };

  // SUBMIT Handler ----------------------------------
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
      const { data } = await createPost({ postData, type: 'feed' }).unwrap();
    } catch (error) {
      console.log('error', error);
    }
    setPostText('');
    setPostBackground(null);
    setPostImages([]);
    setVisible(false);
  };

  return (
    <>
      <Modal className='create_post_modal' visible={visible} setVisible={setVisible}>
        <form className='card_main modal_wrapper' onSubmit={submitPostHandler}>
          <Modalheader setVisible={setVisible} headerText='Create Post' />
          <div className='vert_line'></div>
          <div className='modal_bottom'>
            <PostModalUser />
            <PostTextarea
              imagePickerVisible={imagePickerVisible}
              bgRef={bgRef}
              post={postText}
              setPost={setPostText}
            />
            <BgAndEmojiSelectors
              imagePickerVisible={imagePickerVisible}
              postBackgrounds={postBackgrounds}
              post={postText}
              setPost={setPostText}
              changeBackground={changeBackgroundHandler}
            />
            {imagePickerVisible && (
              <ImagePicker setImages={setPostImages} preview>
                {props => (
                  <AddPhotoUi
                    images={postImages}
                    resetImagePicker={resetImagePicker}
                    openSystemUi={props.open}
                    error={props.error}
                    setError={props.setError}
                    getRootProps={props.getRootProps}
                  />
                )}
              </ImagePicker>
            )}
            <AddToPost setVisible={setImagePickerVisible} />

            <button className='btn red_btn post_submit' type='submit' disabled={isLoading}>
              {isLoading ? <DotLoader color='var(--white-main)' size={5} /> : 'Post'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
