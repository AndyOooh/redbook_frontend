import { Dots, NewRoom,  SearchSVG } from 'assets/svg';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import './styles.scss';

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
          <Contact user={currentUser} />
        </div>
      </div>
    </section>
  );
};
