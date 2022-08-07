import { useSelector } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { first_name, last_name } = useSelector(state => state.auth.user);
  console.log('first_name: ', first_name);

 

  return (
    <>
      <h1>Profile Component</h1>
      <h2>{first_name} </h2>
      <h2>{last_name} </h2>
      <Link to='/'>Home</Link>
      <Link to='/reset'>Reset</Link>
    </>
  );
};
export default Profile;
