import { Routes, Route } from 'react-router-dom';
import { profileMenuItems } from './profileNavigation/profileMenuItems';

export const ProfileBottom = () => {
  return (
    <>
      <Routes>
        {profileMenuItems.map(item =>
          item.index ? (
            <Route index key={item.name} path={item.link} element={item.component} />
          ) : (
            <Route key={item.name} path={item.link} element={item.component} />
          )
        )}
      </Routes>
    </>
  );
};
