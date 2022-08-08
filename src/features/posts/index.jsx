import { useState } from 'react';

// import UserMenu from "layout/header/userMenu";
import './style.scss';

import { CreatePostModal } from './createPostModal/CreatePostModal';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostBody } from './CreatePostBody';

export default function CreatePost() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      {modalVisible && <CreatePostModal setVisible={setModalVisible} />}
      <section className='createPost'>
        <CreatePostHeader setModalVisible={setModalVisible} />
        <div className='vert_line'></div>
        <CreatePostBody />
      </section>
    </>
  );
}
