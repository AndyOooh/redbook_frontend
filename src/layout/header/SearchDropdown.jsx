import { useEffect, useRef, useState } from 'react';
import { Return, Search } from 'assets/svg';
import { useClickOutside } from 'hooks/useClickOutside';

export default function SearchDropdown({ color, setVisible }) {
  const [iconVisible, setIconVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setVisible(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className='search_dropdown ' ref={menu}>
      <div className='dropdown_header'>
        <div className='circle hover1' onClick={() => setVisible(false)}>
          <Return color={color} />
        </div>
        <div className='search' onClick={() => input.current.focus()}>
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type='text'
            placeholder='Search Redbook'
            ref={input}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>
      <div className='search_history_header'>
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className='search_history'></div>
      <div className='search_results scrollbar'></div>
    </div>
  );
}
