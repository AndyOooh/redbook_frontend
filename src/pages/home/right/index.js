import { Dots, NewRoom, Search } from 'assets/svg';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import './styles.scss';

export const RightHome = () => {
  const { user } = useSelector(state => state.auth);
  const color = '#65676b';

  return (
    <section className='right_home'>
      <div className='heading'>Sponsored</div>
      <div className="vert_line"></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>Contacts</div>
          <div className='contacts_header_right'>
            <div className='contact_circle hover1'>
              <NewRoom color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Search color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className='contacts_list'>
          <Contact user={user} />
        </div>
      </div>
    </section>
  );
};
