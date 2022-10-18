import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProfileContext } from './profileContext/profileContext';
import { profileMenuItems } from './profileNavigation/profileMenuItems';

export const ProfileBottom = props => {
  const profCtx = useContext(ProfileContext);
  console.log('🚀 ~ file: ProfileBottom.jsx ~ line 7 ~ profCtx', profCtx);
  return (
    <>
      <Routes>
        {profileMenuItems.map(item => (
          <Route key={item.name} path={item.link} element={item.component({ ...props })} />
        ))}
      </Routes>
    </>
  );
};
