import { MdOutlineCancelPresentation } from 'react-icons/md';
import { RiUserUnfollowLine } from 'react-icons/ri';

import './RequestDropDown.scss';

export const RequestDropDown = ({ handleFriendRequest, friendship, visible, setVisible }) => {
  const { friends, following, requestSent, requestReceived } = friendship;

  // <img src='../../../icons/unfollowOutlined.png' alt='' />

  const clickHandler = name => {
    // e.preventDefault();
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
