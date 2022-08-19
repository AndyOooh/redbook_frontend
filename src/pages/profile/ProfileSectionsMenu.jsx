import { Link, NavLink } from 'react-router-dom';

import { menuItems } from './menuItems';

export const ProfileSectionsMenu = () => {
  return (
    <div className='meu_wrapper'>
      {menuItems.map(item => {
        return (
          <div className='menu_item' key={item.name}>
            <NavLink
              to={item?.link}
              className={({ isActive }) => (isActive ? 'link active_link ' : 'link')}
              end>
              {item.name}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
