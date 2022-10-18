import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { NavLink, useSearchParams } from 'react-router-dom';

import { Dots, Search } from 'assets/svg';
import './Photos.scss';

export const Photos = props => {
  const color = '#65676b';
  const photos = props.user.pictures.slice(0, -1);
  const { visitor, user } = props;

  const params = useParams();
  const page = Object.values(params).includes('photos') ? 'photos' : 'profile';

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const photosNav = [
    { title: `Photos of ${visitor ? user.first_name : 'you'}`, section: 'photos_of' },
    { title: 'Your photos', section: 'photos_by' },
    { title: 'Albums', section: 'photos_albums' },
  ];

  return (
    <>
      <section className='card_main photos'>
        <header className='photos_header'>
          <span className='card_title'>Photos</span>
          <div className='header_right'>
            <NavLink to='photos'>
              <span>See all photos</span>
            </NavLink>
          </div>
        </header>
        {page === 'photos' && (
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
        )}

        <div className='photos_grid_wrapper'>
          <div className='photos_grid'>
            {photos.slice(0, 9).map(photo => {
              return <img src={photo.url} alt='' />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};
