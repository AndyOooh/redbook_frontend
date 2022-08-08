import { Modal } from 'components';
import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

import './CreatePostModal.scss';
import { AddToPost } from './AddToPost';
import { ImagePicker } from './ImagePicker';
import { PostModalheader } from './PostModalheader';
import { PostTextarea } from './PostTextarea';
import { PostModalUser } from './PostModalUser';
import { BgAndEmojiSelectors } from './bgAndEmoji/BgAndEmojiSelectors';
import { addPost } from '../postSlice';
import { useCreatePostMutation } from '../postsApiSlice';

export const CreatePostModal = ({ setVisible }) => {
  const { user } = useSelector(state => state.auth);
  const bgRef = useRef();

  const dispatch = useDispatch();

  const [post, setPost] = useState(''); // Set post here ------------------
  const [background, setBackground] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const [createPost, { isLoading, error }] = useCreatePostMutation();

  console.log('post', post);
  console.log('background', background);
  console.log('images', images);

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
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };

  const submitPostHandler = async e => {
    e.preventDefault();

    let postData = new FormData();

    // let postImages = images.map(image => {
    //   return dataURItoBlob(image);
    // });

    postData.append('post', post);
    postData.append('background', background);
    // postData.append('images', images);
    for (let i = 0; i < images.length; i++) {
      postData.append('images', images[i]);
    }

    // log formData
    for (var pair of postData.entries()) {
      console.log('in for loop');
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }

    console.log('postData', postData);

    try {
      // const data = await fetch('http://httpbin.org/anything', {
      // const data = await fetch('http://localhost:8000/api/posts', {
      //   method: 'POST',
      //   body: postData,
      // });
      const { data } = await createPost(postData).unwrap();
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Modal styles='create_post_modal'>
        <form className='modal_wrapper' onSubmit={submitPostHandler} encType='multipart/form-data'>
          <PostModalheader setModalVisiable={setVisible} />
          <div className='vert_line'></div>
          <div className='modal_bottom'>
            <PostModalUser />
            <PostTextarea
              // setImagePickerVisible={setImagePickerVisible}
              imagePickerVisible={imagePickerVisible}
              bgRef={bgRef}
              post={post}
              setPost={setPost}
            />
            {/* INssrt bg emoji picker component OR NOT */}
            <BgAndEmojiSelectors
              imagePickerVisible={imagePickerVisible}
              postBackgrounds={postBackgrounds}
              post={post}
              setPost={setPost}
              // handleEmojiInput={handleEmojiInput}
              // showEmojiPicker={showEmojiPicker}
              changeBackgroundHandler={changeBackgroundHandler}
            />
            {imagePickerVisible && <ImagePicker images={images} setImages={setImages} />}
            <AddToPost setVisible={setImagePickerVisible} />

            <button
              className='btn post_submit'
              type='submit'
              // onClick={submitPostHandler}
              // disabled={isLoading}
            >
              Post
              {/* {isLoading ? <PulseLoader color='#fff' size={5} /> : 'Post'} */}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
