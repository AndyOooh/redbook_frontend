import { Modal } from 'components';
import React from 'react';

export const DeleteUserPopup = ({ visible, setVisible, deletehandler, userId }) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className='card_main delete_popup'>
        <span>Are you sure you want to delete your account?</span>
        <div className='popup_buttons'>
          <button className='btn red_btn' onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button className='btn blue_btn' onClick={() => deletehandler(userId)}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};
