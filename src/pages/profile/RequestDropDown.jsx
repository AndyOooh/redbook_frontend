import { useContext } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { ProfileContext } from './profileContext/profileContext';

import './RequestDropDown.scss';

export const RequestDropDown = ({ visible, setVisible }) => {
  const { handleFriendRequest, profileUser } = useContext(ProfileContext);
  const { friends, requestReceived } = profileUser.friendship;

  const clickHandler = name => {
    handleFriendRequest(name);
    setVisible(false);
  };

  return (
    visible &&
    (friends ? (
      <aside className='modal_type_1 request_dropdown'>
        <div className='dropdown_item' onClick={() => clickHandler('unfriend')}>
          <RiUserUnfollowLine />
          <p>Unfriend</p>
        </div>

        <div className='dropdown_item' onClick={() => clickHandler('unfollow')}>
          <MdOutlineCancelPresentation />
          <p>Unfollow</p>
        </div>
      </aside>
    ) : requestReceived ? (
      <aside className='modal_type_1 request_dropdown'>
        <div className='dropdown_item' onClick={() => clickHandler('accept')}>
          <RiUserUnfollowLine />
          <p>Accept</p>
        </div>
        <div className='dropdown_item' onClick={() => clickHandler('reject')}>
          <MdOutlineCancelPresentation />
          <p>Remove request</p>
        </div>
      </aside>
    ) : null)
  );
};
