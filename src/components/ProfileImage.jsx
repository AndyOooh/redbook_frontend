import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const ProfileImage = ({ size, isHeader, image }) => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const onProfileRoute = location?.pathname === '/profile';

  const src = image ? image : user?.pictures[0]?.url;

  const imageStyles = {
    // width: '100%',
    height: '100%',
    borderRadius: '50%',
  };

  let wrapperStyles = {
    borderRadius: '50%',
    width: size,
    height: size,
    cursor: 'pointer',
  };

  const activeStyles = {
    border: '3px solid var(--red-main)',
  };

  if (onProfileRoute && isHeader) {
    wrapperStyles = {
      ...wrapperStyles,
      ...activeStyles,
    };
  }

  const wrapperClasses = onProfileRoute ? 'wrapperStyle activeStyles' : 'wrapperStyle';

  return (
    <div style={wrapperStyles} className={wrapperClasses}>
      <img src={src} alt='profile_image' style={imageStyles} />
    </div>
  );
};
