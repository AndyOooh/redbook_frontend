import { Routes, Route } from 'react-router-dom';
import { menuItems } from './menuItems';

export const ProfileBottom = () => {
  return (
    <>
      <Routes>
        {menuItems.map(item => (
          <Route key={item.name} path={item.link} element={item.component} />
        ))}
      </Routes>
    </>
  );
};
