import { useClickOutside } from 'hooks/useClickOutside';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import './Modal.scss';

export const Modal = ({ children, visible, setVisible, className }) => {
  const modalref = useRef(null);
  useClickOutside(modalref, () => setVisible(false));
  const theme  = useSelector(state => state.auth.user?.theme);
  const themeClass = theme || 'dark'; 
  const classes = ['modal app', className].join(' ');

  return (
    visible && (
      <>
        {createPortal(<div className='backdrop'></div>, document.getElementById('backdrop-root'))}
        {createPortal(
          <section ref={modalref} className={themeClass}>
          {/* <section ref={modalref}> */}
            <div className={classes}>{children}</div>
          </section>,
          document.getElementById('overlay-root')
        )}
      </>
    )
  );
};
