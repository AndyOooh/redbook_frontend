import { Modal } from 'components';
import { useRef, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

import './CreatePostModal.scss';
import { AddToPost } from './AddToPost';
// import { ImagePicker } from './ImagePicker';
import { ImagePicker } from './ImagePicker';
import { PostModalheader } from './PostModalheader';
import { PostTextarea } from './PostTextarea';
import { PostModalUser } from './PostModalUser';
import { BgAndEmojiSelectors } from './bgAndEmoji/BgAndEmojiSelectors';
// import { addPost } from '../postSlice';
import { useCreatePostMutation } from '../postsApiSlice';

// TODO:
// Add Yup validation and error messages. Text shuod be required. Use the yup formIsvalid from elsewhere <-- use to enable/disable submit button.
export const CreatePostModal = ({ setVisible }) => {
  // const { user } = useSelector(state => state.auth);
  const bgRef = useRef();

  // const dispatch = useDispatch();

  const [postText, setPostText] = useState(''); // Set post here ------------------
  const [postBackground, setPostBackground] = useState(null);
  const [postImages, setPostImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(true);

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

  // const handleEmojiInput = emoji => {
  //   setPost(post + emoji.native);
  // };

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

    console.log('postData', postData);

    try {
      const { data } = await createPost(postData).unwrap();
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }

    setPostText('');
    setPostBackground(null);
    setPostImages([]);
    setVisible(false);
  };

  const imagePickerClasses =
    previewImages && previewImages.length > 0
      ? 'image_picker has_images overflow_a scrollbar'
      : 'image_picker';

  return (
    <>
      <Modal styles='create_post_modal'>
        <form className='modal_wrapper' onSubmit={submitPostHandler}>
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
              changeBackgroundHandler={changeBackgroundHandler}
            />
            {imagePickerVisible && (
              <ImagePicker
                className={imagePickerClasses}
                setImages={setPostImages}
                setPreviewImages={setPreviewImages}>
                {props =>
                  previewImages && previewImages.length > 0 ? (
                    <>
                      <div className='image_preview'>
                        <div className='preview_menu'>
                          <div className='preview_buttons'>
                            <button className='hover1' type='button'>
                              <i className='edit_icon'></i>
                              Edit
                            </button>
                            <button
                              className='hover1'
                              type='button' // otherwise it will trigger onSubmit
                              // onClick={() => {
                              // imageInputRef.current.click();
                              // inputRef.current.click();
                              // }}
                              onClick={props.open}>
                              <i className='addPhoto_icon'></i>
                              Add Photos/Videos
                              <span> {props.globals}</span>
                            </button>
                          </div>
                          <div
                            className='small_circle'
                            onClick={() => {
                              setPreviewImages([]);
                              setPostImages([]);
                              setImagePickerVisible(false);
                            }}>
                            <i className='exit_icon'></i>
                          </div>
                        </div>
                        <div className='image_grid'>
                          {previewImages.map((img, i) => (
                            <img src={img} key={i} alt='' />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='add_image_desktop'>
                        <div className='top'>
                          <div
                            className='small_circle'
                            onClick={() => {
                              setPreviewImages([]);
                              setPostImages([]);
                              setImagePickerVisible(false);
                            }}>
                            <i className='exit_icon'></i>
                          </div>
                        </div>
                        <div
                          className='bottom'
                          role='button'
                          // onClick={() => {
                          //   inputRef.current.click();
                          // }}>
                          onClick={props.open}>
                          <div className='small_circle'>
                            <i className='addPhoto_icon'></i>
                          </div>
                          <span>Add Photos/Videos</span>
                          <span>or drag and drop</span>
                        </div>
                      </div>
                      <div className='add_image_mobile'>
                        <div className='mobile_left'>
                          <div className='small_circle'>
                            <i className='phone_icon'></i>
                          </div>
                          <div className='mobile_text'>Add photos from your mobile device.</div>
                        </div>
                        <span className='addphone_btn'>Add</span>
                      </div>
                    </>
                  )
                }
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
