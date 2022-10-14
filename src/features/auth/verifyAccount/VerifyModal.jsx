import { DotLoader } from 'react-spinners';

import { Modal } from 'components';

export const VerifyModal = ({ isLoading, isSuccess, error, successMessage }) => {
  const headerText = isSuccess ? 'Account verification succeded.' : 'Account verification failed.';
  const message = isSuccess ? successMessage : error?.data.message;
  const classname = isSuccess ? 'success_text' : 'error_text';

  if (isLoading) {
    <DotLoader color='var(--red-main)' size={40} loading={isLoading} />;
  } else {
    <>
      <div className={`header ${classname}`}>{headerText}</div>
      <div className='message'>{message}</div>
    </>;
  }

  return (
    <Modal styles='verify_modal'>
      {isLoading ? (
        <DotLoader color='var(--red-main)' size={40} loading={isLoading} />
      ) : (
        <>
          <div className={`header ${classname}`}>{headerText}</div>
          <div className='message'>{message}</div>
        </>
      )}
    </Modal>
  );
};
