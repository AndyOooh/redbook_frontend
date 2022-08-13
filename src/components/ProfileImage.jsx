import { useSelector } from 'react-redux';

export const ProfileImage = ({ size }) => {
  const styles = {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  };

  const wrapperStyles = {
    width: size,
    height: size,
  };

  const { user } = useSelector(state => state.auth);
  return (
    <div style={wrapperStyles}>
      <img src={user?.picture} alt='profile_image' style={styles} />
    </div>
  );
};
