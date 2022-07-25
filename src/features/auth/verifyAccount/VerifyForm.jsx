import { Modal } from 'components';
import { useSelector } from 'react-redux';
import { DotLoader, PropagateLoader } from 'react-spinners';

export const VerifyForm = () => {
  const { isLoading, isSuccess, message } = useSelector(state => state.auth);
  const headerText = isSuccess ? 'Account activation succeded.' : 'Account activation failed.';
  return (
    // <Modal styles='signupForm_wrapper' hideModal={() => setIsVisible(false)}>
    <Modal styles='activate_modal'>
      {/* <div className='header'>
        <div className='heading'></div>
        <h1>Activate Account</h1>
        <span>Please enter the activation code that was sent to your email.</span>
        <DotLoader color='#1876f2' sixe={30} loading={loading} />
      </div> */}
      {isLoading ? (
        <DotLoader color='#1876f2' size={40} loading={isLoading} />
      ) : (
        // <PropagateLoader color='#1876f2' size={20} loading={isLoading} />
        <>
          <div className={`header ${isSuccess ? 'success_text' : 'error_text'}`}>{headerText}</div>
          <div className='message'>{message}</div>
        </>
      )}
    </Modal>
  );
};

export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className='blur'>
      <div className='popup'>
        <div className={`popup_header ${type === 'success' ? 'success_text' : 'error_text'}`}>
          {header}
        </div>
        <div className='popup_message'>{text}</div>
        <PropagateLoader color='#1876f2' size={20} loading={loading} />
      </div>
    </div>
  );
}
