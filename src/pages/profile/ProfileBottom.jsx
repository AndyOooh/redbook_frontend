import { Routes, Route } from 'react-router-dom';
import { menuItems } from './menuItems';

export const ProfileBottom = props => {
  return (
    <>
      <Routes>
        {menuItems.map(item => (
          // <Route key={item.name} path={item.link} element={item.component(userId)} />
          <Route key={item.name} path={item.link} element={item.component({ ...props })} />
        ))}
      </Routes>
    </>
  );
};
