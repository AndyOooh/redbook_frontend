import { useHoverHandler } from 'hooks/useHoverHandler';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Friends, Gaming, Home, Market, Watch } from 'assets/svg';

export const NavBar = () => {
  const [showTitleBox, setShowTitleBox] = useState(null);
  const hoverHandler = useHoverHandler();

  const navItems = [
    {
      name: 'home',
      link: '/',
      svg: <Home />,
    },
    {
      name: 'groups',
      link: '/groups',
      svg: <Friends />,
    },
    {
      name: 'watch',
      link: '/watch',
      svg: <Watch />,
    },
    {
      name: 'marketplace',
      link: '/marketplace',
      svg: <Market />,
    },
    {
      name: 'gaming',
      link: '/gaming',
      svg: <Gaming />,
    },
  ];

  const navBar = navItems.map(item => {
    return (
      <li key={item.name}>
        <NavLink
          end
          to={item.link}
          className={({ isActive }) =>
            isActive ? 'nav_link nav_link_active' : 'nav_link nav_link_inactive'
          }
          onMouseOver={() => hoverHandler(setShowTitleBox, item.name)}
          onMouseLeave={() => hoverHandler(setShowTitleBox, null)}>
          {item.svg}
          {showTitleBox === item.name && <div className='titleBox'>{item.name}</div>}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className='header_nav'>
      <ul className='nav_list'>{navBar}</ul>
    </nav>
  );
};
