import { useContext } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import './Photos.scss';
import { ProfileContext } from 'pages/profile/profileContext/profileContext';

export const Photos = () => {
  // const color = '#65676b';
  const { profileUser, visitor } = useContext(ProfileContext);
  const searchParams = useSearchParams()[0];
  const section = searchParams.get('section');
  const photos =
    section === 'photos_of'
      ? profileUser.pictures.slice(0, -1)
      : section === 'photos_by'
      ? profileUser.postPictures
      : section === 'photos_albums'
      ? [...profileUser.pictures.slice(0, -1), ...profileUser.postPictures] //Not developed yet
      : profileUser.pictures.slice(0, -1)

  const params = useParams();
  const page = Object.values(params).includes('photos') ? 'photos' : 'profile';

  const photosNav = [
    { title: `Photos of ${visitor ? profileUser.first_name : 'you'}`, section: 'photos_of' },
    { title: visitor ? `${profileUser.first_name}'s photos` : 'Your photos', section: 'photos_by' },
    { title: 'Albums', section: 'photos_albums' },
  ];

  return (
    <>
      <section className='card_main photos'>
        <header className='photos_header'>
          <span className='card_title'>Photos</span>
          <div className='header_right'>
            {page === 'profile' && (
              <NavLink to='photos'>
                <span>See all photos</span>
              </NavLink>
            )}
            {page === 'photos' && !visitor && (
              <NavLink to='photos'>
                <span>Add photos/videos</span>
              </NavLink>
            )}
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
            {photos?.slice(0, 9).map(photo => {
              return <img src={photo.url} alt='' key={photo.id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};
