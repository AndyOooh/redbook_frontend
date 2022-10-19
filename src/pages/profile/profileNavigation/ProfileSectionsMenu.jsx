import { NavLink } from 'react-router-dom';

import { profileMenuItems } from './profileMenuItems';

export const ProfileSectionsMenu = () => {
  return (
    <div className='menu_wrapper'>
      {profileMenuItems.map(item => {
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
