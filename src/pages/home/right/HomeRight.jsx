import { useSelector } from 'react-redux';

import './HomeRight.scss';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Dots, NewRoom, SearchSVG } from 'assets/svg';
import Contact from './Contact';

export const HomeRight = () => {
  const currentUser = useSelector(selectCurrentUser);
  const color = '#65676b';

  return (
    <section className='right_home'>
      <div className='heading'>Sponsored</div>
      <div className='vert_line'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>Contacts</div>
          <div className='contacts_header_right'>
            <div className='contact_circle hover1'>
              <NewRoom color={color} />
            </div>
            <div className='contact_circle hover1'>
              <SearchSVG color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className='contacts_list'>
          {currentUser.friends?.map(friend => (
            <Contact key={friend._id} user={friend} />
          ))}
        </div>
      </div>
    </section>
  );
};
