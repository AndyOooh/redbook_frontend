import { SearchSVG } from 'assets/svg';
import { useState } from 'react';
import { SearchDropdown } from './SearchDropdown';

import './SearchBar.scss';
import { useLazySearchUserNameQuery } from 'features/users/usersApiSlice';
import { useEffect } from 'react';

export const SearchBar = () => {
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [trigger, { data: searchResult }] = useLazySearchUserNameQuery();

  useEffect(() => {
    if (searchTerm.length > 1) { // Only seacrh with minimum 2 characters
      trigger(searchTerm, true); //true here makes use of cahced data instead of new request.
    }
  }, [searchTerm, trigger]);

  const changeHandler = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setShowSearchMenu(true);
  };

  return (
    <div className='search_bar'>
      <div className='search search1' onClick={() => setShowSearchMenu(true)}>
        <SearchSVG color={color} />
        <input
          type='text'
          placeholder='Search Redbook'
          className='hide_input'
          value={searchTerm}
          onChange={changeHandler}
        />
      </div>
      {showSearchMenu && (
        <SearchDropdown searchResult={searchResult} color={color} setVisible={setShowSearchMenu} />
      )}
    </div>
  );
};
