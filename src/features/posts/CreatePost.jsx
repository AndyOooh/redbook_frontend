import { useState } from 'react';

// import UserMenu from "layout/header/userMenu";
import './CreatePost.scss';

import { CreatePostModal } from './createPostModal/CreatePostModal';
// import { CreatePostModal } from './createPostModal/CreatePostModal copy';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostBody } from './CreatePostBody';

export const CreatePost = () => {
  const [modalVisible, setModalVisible] = useState(true);

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
