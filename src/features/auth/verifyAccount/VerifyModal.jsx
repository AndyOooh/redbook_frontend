import { DotLoader } from 'react-spinners';

import { Modal } from 'components';

export const VerifyModal = ({ isLoading, isSuccess, error, successMessage }) => {
  const headerText = isSuccess ? 'Account verification succeded.' : 'Account verification failed.';
  const message = isSuccess ? successMessage : error?.data.message;
  const classname = isSuccess ? 'success_text' : 'error_text';

  if (isLoading) {
    <div className='dot_loader'>
      <DotLoader color='var(--red-main)' size={40} />
    </div>;
  } else {
    <>
      <div className={`header ${classname}`}>{headerText}</div>
      <div className='message'>{message}</div>
    </>;
  }

  return (
    <Modal styles='verify_modal'>
      {isLoading ? (
        <div className='dot_loader'>
          <DotLoader color='var(--red-main)' size={40} />
        </div>
      ) : (
        <>
          <div className={`header ${classname}`}>{headerText}</div>
          <div className='message'>{message}</div>
        </>
      )}
    </Modal>
  );
};
