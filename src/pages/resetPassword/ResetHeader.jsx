import { useLogoutMutation } from 'features/auth/authApiSlice';
import { reset } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const ResetHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logout();
    dispatch(reset);
    navigate('/login');
  };

  const rightHeader = user ? (
    <div className='right_header'>
      <Link to='/profile'>
        <img src={user.picture} alt='' />
      </Link>
      <button className='blue_btn' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  ) : (
    <>
      {/* <Link to='/'>Back to Home</Link>
      <Link to='/profile'>Back to Profile</Link> */}
      <Link to='/login' className='right_header'>
        <button className='btn blue_btn'>Login</button>
      </Link>
    </>
  );

  return (
    <header className='header'>
      <img src='../../../icons/facebook.svg' alt='' />
      <div className='right_header'>{rightHeader}</div>
    </header>
  );
};
