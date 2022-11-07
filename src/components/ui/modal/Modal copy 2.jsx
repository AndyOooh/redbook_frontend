import { useClickOutside } from 'hooks/useClickOutside';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

export const Modal = ({ children, visible, setVisible, className }) => {
  const modalref = useRef(null);
  useClickOutside(modalref, () => setVisible(false));

  const classes = ['modal', className].join(' ');

  return (
    visible && (
      <>
        {createPortal(<div className='backdrop'></div>, document.getElementById('backdrop-root'))}
        {createPortal(
          <section ref={modalref} className={classes}>
            {children}
          </section>,
          document.getElementById('overlay-root')
        )}
      </>
    )
  );
};
