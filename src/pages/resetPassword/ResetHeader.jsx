import { useLogoutMutation } from 'features/auth/authApiSlice';
import { resetAuthState, selectCurrentUser } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const ResetHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logout();
    dispatch(resetAuthState);
    navigate('/login');
  };

  const rightHeader = currentUser ? (
    <div className='right_header'>
      <Link to='/profile'>
        <img src={currentUser.picture} alt='' />
      </Link>
      <button className=' btn red_btn' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  ) : (
    <>
      <Link to='/login' className='right_header'>
        <button className='btn red_btn'>Login</button>
      </Link>
    </>
  );

  return (
    <header className='header'>
      <h1 className='welcome_header'>Redbook</h1>
      <div className='right_header'>{rightHeader}</div>
    </header>
  );
};
