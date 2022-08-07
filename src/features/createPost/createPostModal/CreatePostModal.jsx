import { Modal } from 'components';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

import './CreatePostModal.scss';
import { AddToPost } from './AddToPost';
import { ImagePicker } from './ImagePicker';
import { PostModalheader } from './PostModalheader';
import { PostTextarea } from './PostTextarea';
import { PostModalUser } from './PostModalUser';

export const CreatePostModal = ({ setVisible }) => {
  const { user } = useSelector(state => state.auth);

  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  // const submitPostHandler = async () => {
  //   if (background) {
  //     const response = await createPost(null, background, text, null, user.id, user.token);
  //     if (response === 'ok') {
  //       setBackground('');
  //       setText('');
  //       setVisible(false);
  //     } else {
  //       setError(response);
  //     }
  //   } else if (images && images.length) {
  //     const postImages = images.map(img => {
  //       return dataURItoBlob(img);
  //     });
  //     const path = `${user.username}/post Images`;
  //     let formData = new FormData();
  //     formData.append('path', path);
  //     postImages.forEach(image => {
  //       formData.append('file', image);
  //     });
  //     const response = await uploadImages(formData, path, user.token);

  //     const res = await createPost(null, null, text, response, user.id, user.token);
  //     if (res === 'ok') {
  //       setText('');
  //       setImages('');
  //       setVisible(false);
  //     } else {
  //       setError(res);
  //     }
  //   } else if (text) {
  //     const response = await createPost(null, null, text, null, user.id, user.token);
  //     if (response === 'ok') {
  //       setBackground('');
  //       setText('');
  //       setVisible(false);
  //     } else {
  //       setError(response);
  //     }
  //   } else {
  //     console.log('nothing');
  //   }
  // };

  return (
    <>
      <Modal styles='create_post_modal'>
        <div className='modal_wrapper'>
          <PostModalheader setModalVisiable={setVisible} />
          <div className='vert_line'></div>
          <div className='modal_bottom'>
            <PostModalUser />
            <PostTextarea
              setImagePickerVisible={setImagePickerVisible}
              imagePickerVisible={imagePickerVisible}
            />
            {/* INssrt bg emoji picker component OR NOT */}
            {imagePickerVisible && <ImagePicker />}
            <AddToPost setVisible={setImagePickerVisible} />

            <button
              className='btn post_submit'
              // onClick={submitPostHandler}
              // disabled={isLoading}
            >
              Post
              {/* {isLoading ? <PulseLoader color='#fff' size={5} /> : 'Post'} */}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
