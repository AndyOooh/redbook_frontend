import { Modal } from 'components';
import { DotLoader, PropagateLoader } from 'react-spinners';

export const ActivateForm = ({ type, header, text, loading }) => {
  return (
    // <Modal styles='signupForm_wrapper' hideModal={() => setIsVisible(false)}>
    <Modal styles='activate_modal'>
      {/* <div className='header'>
        <div className='heading'></div>
        <h1>Activate Account</h1>
        <span>Please enter the activation code that was sent to your email.</span>
        <DotLoader color='#1876f2' sixe={30} loading={loading} />
      </div> */}
      <div className={`header ${type === 'success' ? 'success_text' : 'error_text'}`}>{header}</div>
      {/* <div className='popup_message'>{text}</div> */}
      <div>{text}</div>
      <PropagateLoader color='#1876f2' size={20} loading={loading} />
    </Modal>
  );
};
