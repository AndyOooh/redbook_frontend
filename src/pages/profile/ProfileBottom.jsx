import { Routes, Route } from 'react-router-dom';
import { profileMenuItems } from './profileMenuItems';

export const ProfileBottom = props => {
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
