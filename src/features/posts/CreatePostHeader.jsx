import { useSelector } from 'react-redux';

export const CreatePostHeader = ({ setModalVisible }) => {
  const { user } = useSelector(state => state.auth);
  return (
      <div className='createPost_header'>
        <img src={user?.picture} alt='' />
        <div className='open_post hover2' onClick={() => setModalVisible(true)}>
          What's on your mind, {user?.first_name} ?
        </div>
      </div>
  );
};
