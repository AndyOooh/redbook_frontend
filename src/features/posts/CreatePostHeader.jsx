import { ProfileImage } from 'components/ProfileImage';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

export const CreatePostHeader = ({ setVisible }) => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className='createPost_header'>
      <ProfileImage size='4rem' />
      <div className='open_post hover2' onClick={() => setVisible(true)}>
        What's on your mind, {user?.first_name} ?
      </div>
    </div>
  );
};
