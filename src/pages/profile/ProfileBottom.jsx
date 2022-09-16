import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { Routes, Route } from 'react-router-dom';
import { menuItems } from './menuItems';

export const ProfileBottom = props => {
  console.log('🚀 ~ file: ProfileBottom.jsx ~ line 5 ~ props', props);

  // const path = props.visitor ? props.user.username : '';
  return (
    <>
      <Routes>
        {menuItems.map(item => (
          // <Route key={item.name} path={item.link} element={item.component(userId)} />
          // <Route key={item.name} path={path + item.link} element={item.component({ ...props })} />
          // <Route key={item.name} path={path + item.link} element={item.component({ ...props })} />
          <Route key={item.name} path={item.link} element={item.component({ ...props })} />
        ))}
      </Routes>
    </>
  );
};
