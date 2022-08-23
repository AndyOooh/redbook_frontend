import { Routes, Route } from 'react-router-dom';
import { menuItems } from './menuItems';

export const ProfileBottom = props => {
  console.log('🚀 ~ file: ProfileBottom.jsx ~ line 5 ~ ProfileBottom ~ props', props);
  // console.log('ProfileBottom userId', userId);
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
