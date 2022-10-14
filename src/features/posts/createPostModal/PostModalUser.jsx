import { ProfileImage } from 'components/ProfileImage';
import { selectCurrentUser } from 'features/auth/authSlice';
import { BsPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

export const PostModalUser = () => {
  const user = useSelector(selectCurrentUser); // Better to pass as prop?

  return (
    <div className='modal_profile'>
      <div className='profile_image'>
        <ProfileImage />
      </div>
      <div className='name_aud_wrapper'>
        <span className='profile_name'>
          {user.first_name} {user.last_name}
        </span>
        <button className='btn'>
          <BsPersonFill />
          Public<i className='arrowDown_icon'></i>
        </button>
      </div>
    </div>
  );
};
