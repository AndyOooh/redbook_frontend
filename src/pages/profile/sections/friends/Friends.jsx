import { Dots, Search } from 'assets/svg';
import { NavLink, useSearchParams } from 'react-router-dom';

import './Friends.scss';

export const Friends = () => {
  const color = '#65676b';

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const friendsNav = [
    { title: 'All friends', section: 'all' },
    { title: 'Recently added', section: 'recently_added' },
    { title: 'Birthdays', section: 'birthdays' },
    { title: 'Work', section: 'work' },
    { title: 'High School', section: 'high_school' },
    { title: 'Current city', section: 'current_city' },
    { title: 'Hometown', section: 'hometown' },
    { title: 'Following', section: 'following' },
  ];

  return (
    <>
      <section className='card_main friends'>
        <header className='friends_header'>
          <span className='card_title'>Friends</span>
          <div className='header_right'>
            <div
              className='search search1'
              // onClick={() => setShowSearchMenu(true)}
            >
              <Search color={color} />
              <input
                type='text'
                placeholder='Search Friends'
                className='friends_search hide_input'
              />
            </div>
            <span>Friend Requests</span>
            <span>Find Friends</span>
            <Dots color='#828387' />
          </div>
        </header>
        <div className='friends_nav'>
          {friendsNav.map(item => {
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
