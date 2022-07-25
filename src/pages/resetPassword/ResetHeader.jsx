import { logout } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ResetHeader = () => {
  const { user } = useSelector(state => state.auth);

  const rightHeader = user ? (
    <div className='right_header'>
      <Link to='/profile'>
        <img src={user.picture} alt='' />
      </Link>
      <button
        className='blue_btn'
        onClick={() => {
          logout();
        }}>
        Logout
      </button>
    </div>
  ) : (
    <Link to='/login' className='right_header'>
      <button className='blue_btn'>Login</button>
    </Link>
  );

  return (
    <header className='header'>
      <img src='../../../icons/facebook.svg' alt='' />
      <div className='right_header'>{rightHeader}</div>
    </header>
  );
};
