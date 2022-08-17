import { useState } from 'react';

import './CreatePost.scss';

import { CreatePostModal } from './createPostModal/CreatePostModal';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostBody } from './CreatePostBody';

export const CreatePost = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible && <CreatePostModal setVisible={setModalVisible} />}
      <section className='home_card createPost'>
        <CreatePostHeader setVisible={setModalVisible} />
        <div className='vert_line'></div>
        <CreatePostBody setVisible={setModalVisible} />
      </section>
    </>
  );
};
