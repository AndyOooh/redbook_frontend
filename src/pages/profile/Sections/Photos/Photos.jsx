import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, useSearchParams } from 'react-router-dom';

import { Dots, Search } from 'assets/svg';
import './Photos.scss';

export const Photos = ({ photos }) => {
  const color = '#65676b';

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const photosNav = [
    { title: 'Photos of you', section: 'photos_of_you' },
    { title: 'Your photos', section: 'your_photos' },
    { title: 'Albums', section: 'albums' },
  ];

  return (
    <>
      <section className='card_main photos'>
        <header className='photos_header'>
          <span className='card_title'>Photos</span>
          <div className='header_right'>
            <span>Add photos/video</span>
            <Dots color='#828387' />
          </div>
        </header>
        <div className='photos_nav'>
          {photosNav.map(item => {
            return (
              <NavLink
                to={`?section=${item.section}`}
                className={section === item.section ? 'menu_link active_link ' : 'menu_link'}
                key={item.title}>
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </section>
    </>
  );
};
