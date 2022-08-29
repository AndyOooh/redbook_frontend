// import { useClickOutside } from 'hooks/useClickOutside';
import { createPortal } from 'react-dom';

import { BackDrop } from '../backdrop/Backdrop';
import { Card } from '../card/Card';

export const Modal = props => {
  return (
    <>
      {createPortal(
        <BackDrop onClickBackDrop={props.hideModal} />,
        document.getElementById('backdrop-root')
      )}
      {createPortal(
        <Card extraClasses={props.styles ? props.styles : null}>{props.children} </Card>,
        document.getElementById('overlay-root')
      )}
    </>
  );
};