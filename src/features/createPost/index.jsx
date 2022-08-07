import { useState } from 'react';
import { useSelector } from 'react-redux';

// import UserMenu from "layout/header/userMenu";
import './style.scss';
import { Feeling, LiveVideo, Photo } from 'assets/svg';
import { CreatePostModal } from './CreatePostModal';

export default function CreatePost() {
  const { user } = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(true);

  

  return (
    <>
      {modalVisible && <CreatePostModal setVisible={setModalVisible} />}
      <div className='createPost'>
        <div className='createPost_header'>
          <img src={user?.picture} alt='' />
          <div className='open_post hover2' onClick={() => setModalVisible(true)}>
            What's on your mind, {user?.first_name} ?
          </div>
        </div>
        <div className='create_splitter'></div>
        <div className='createPost_body'>
          <div className='createPost_icon hover1'>
            <LiveVideo color='#f3425f' />
            Live Video
          </div>
          <div className='createPost_icon hover1'>
            <Photo color='#4bbf67' />
            Photo/Video
          </div>
          <div className='createPost_icon hover1'>
            <Feeling color='#f7b928' />
            Feeling/Activity
          </div>
        </div>
      </div>
    </>
  );
}
