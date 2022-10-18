import { useGetUserQuery } from 'features/users/usersApiSlice';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { ProfileContext } from './profileContext';

export const ProfileProvider = props => {
  const [visitor, setVisitor] = useState(null);

  const [profileUser, setProfileUser] = useState(null);

  const {
    data: profileData,
    isLoading: getUserLoading,
    isSuccess: getUserSuccess,
    isError: getUserError,
  } = useGetUserQuery({
    userId: username || user.username,
    type: 'profile',
  });

  useEffect(() => {
    if (getUserSuccess) {
      setProfileUser(profileData);
    }
  }, [getUserSuccess, profileData]);

  const profileContext = useMemo(
    () => ({
      visitor,
      setVisitor,
      profileUser,
      setProfileUser,
      arr: [1, 2, 3],
    }),
    [visitor, profileUser]
  );

  return <ProfileContext.Provider value={profileContext}>{props.children}</ProfileContext.Provider>;
};
