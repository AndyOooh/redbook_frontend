import { ProfileImage } from 'components/ProfileImage';
import { selectCurrentUser, updateUserStore } from 'features/auth/authSlice';
import { useLazyGetUsersQuery, useUpdateUserMutation } from 'features/users/usersApiSlice';
import { useClickOutside } from 'hooks/useClickOutside';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearchDropdown.scss';

export const SearchDropdown = ({ searchResult, setVisible }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const currentUser = useSelector(selectCurrentUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useClickOutside(dropdownRef, () => {
    setVisible(false);
    // setSearchResult([]);
  });

  // const searchedIds = currentUser.search.slice(0, 6);
  const searchedIds = useMemo(() => currentUser.search.slice(0, 6), [currentUser]);
  console.log('🚀 ~ file: SearchDropdown.jsx ~ line 23 ~ searchedIds', searchedIds)
  const searchIdsString = searchedIds.map(id => `${id}`).join(',');

  const [trigger, { data: prevSearchedUsers }] = useLazyGetUsersQuery();
  console.log('🚀 ~ file: SearchDropdown.jsx ~ line 26 ~ prevSearchedUsers', prevSearchedUsers)

  useEffect(() => {
    if (searchedIds.length > 0) {
      const queryObject = { _id: searchIdsString };
      // do not query if no search history
      trigger(queryObject);
    }
  }, [trigger, searchedIds, searchIdsString]);

  // Add search result to array on user
  const clickResultHandler = async profileId => {
    const payload = { search: profileId };
    console.log('🚀 ~ file: SearchDropdown.jsx ~ line 50 ~ payload', payload)
    try {
      const { data, isLoading } = await updateUser({
        payload: payload,
        userId: currentUser.id,
        isArray: true,
      });
      console.log('🚀 ~ file: SearchDropdown.jsx ~ line 47 ~ data', data)
      dispatch(updateUserStore(data.updatedUser));
    } catch (error) {
      console.log('🚀 ~ file: SearchDropdown.jsx ~ line 24 ~ error', error);
    }
  };

  let dropDownHeader;
  let dropDownBody;

  if (searchResult?.length > 0) {
    dropDownHeader = <span>Search results</span>;
    dropDownBody = searchResult.map(result => {
      return (
        <Link
          key={result._id}
          // to={`/${result.username}`}
          to={`/${result.username}`}
          className='search_result'
          onClick={() => clickResultHandler(result._id)}>
          <ProfileImage image={result?.pictures[0]?.url} size='2rem' />
          <span>{result.full_name}</span>
        </Link>
      );
    });
  } else {
    dropDownHeader = <span>Search History</span>;
    dropDownBody = prevSearchedUsers?.slice(0, 6).map(user => (
      <div className='search_dropdown_item' key={user._id}>
        <Link
          to={`/${user.username}`}
          // to={user.username}
          className='search_result'>
          <ProfileImage image={user.pictures[0].url} size='2rem' />
          <span>{user.full_name}</span>
        </Link>
      </div>
    ));
  }

  return (
    <div ref={dropdownRef} className='search_dropdown card_main'>
      <div className='dropdown_header'>{dropDownHeader}</div>
      <div className='dropdown_body'>{dropDownBody}</div>
    </div>
  );
};
