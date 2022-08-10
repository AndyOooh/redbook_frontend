import { useState } from 'react';

// import UserMenu from "layout/header/userMenu";
import './style.scss';

import { CreatePostModal } from './createPostModal/CreatePostModal';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostBody } from './CreatePostBody';

export default function CreatePost() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {modalVisible && <CreatePostModal setVisible={setModalVisible} />}
      <section className='createPost'>
        <CreatePostHeader setVisible={setModalVisible} />
        <div className='vert_line'></div>
        <CreatePostBody setVisible={setModalVisible}/>
      </section>
    </>
  );
}
