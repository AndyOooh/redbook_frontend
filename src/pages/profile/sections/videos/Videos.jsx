import { NavLink, useSearchParams } from 'react-router-dom';

import { Dots, Search } from 'assets/svg';
import './Videos.scss';

export const Videos = () => {
  const color = '#65676b';

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const videosNav = [
    { title: 'Videos of you', section: 'videos_of_you' },
    { title: 'Your videos', section: 'your_videos' },
  ];

  return (
    <>
      <section className='card_main videos'>
        <header className='videos_header'>
          <span className='card_title'>Videos</span>
          <div className='header_right'>
            <span>Add video</span>
            <Dots color='#828387' />
          </div>
        </header>
        <div className='videos_nav'>
          {videosNav.map(item => {
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
