import { Link, NavLink } from 'react-router-dom';

import { profileMenuItems } from './profileMenuItems';

export const ProfileSectionsMenu = ({ user, visitor }) => {
  // const path = visitor ? user.username : '';

  return (
    <div className='menu_wrapper'>
      {profileMenuItems.map(item => {
        return (
          <div className='menu_item' key={item.name}>
            <NavLink
              // to={visitor ? user.username + item?.link : '/profile' + item?.link}
              // to={visitor ? item?.link : '/profile' + item?.link}
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
