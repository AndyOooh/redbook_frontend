import { useHoverHandler } from 'hooks/useHoverHandler';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import { AiFillHome } from 'react-icons/ai';

import { Friends, Gaming, Home, Market, Watch } from 'assets/svg';

export const NavBar = () => {
  const [showTitleBox, setShowTitleBox] = useState('watch');
  const hoverHandler = useHoverHandler();

  const navItems = [
    {
      name: 'home',
      link: '/',
      svg: <Home />,
      //   svg: <AiFillHome />,
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
      <>
        <NavLink
          end
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            isActive ? 'nav_link nav_link_active' : 'nav_link nav_link_inactive'
          }
          onMouseOver={() => hoverHandler(setShowTitleBox, item.name)}
          onMouseLeave={() => hoverHandler(setShowTitleBox, null)}>
          {item.svg}
          {showTitleBox === item.name && <div className='titleBox'>{item.name}</div>}
        </NavLink>
      </>
    );
  });

  //   return <ul className='navBar header_nav'>{navBar}</ul>;
  return (
    <nav className='header_nav'>
      <div className='nav_list'>{navBar}</div>
    </nav>
  );
};
