import { selectCurrentUser } from 'features/auth/authSlice';
import { useFriendRequestMutation, useGetUserQuery } from 'features/users/usersApiSlice';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ProfileContext } from './profileContext';

export const ProfileProvider = props => {
  const [visitor, setVisitor] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const user = useSelector(selectCurrentUser);
  const { username } = useParams();

  useEffect(() => {
    setVisitor(username ? username !== user.username : false);
  }, [username, user.username]);

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

  // friend requests only used in visitorButtons. Could move there unless used elsewhere.
  const [friendRequest, { isLoading: friendRequestLoading, isSuccess: friendRequestSuccess }] =
    useFriendRequestMutation();

  const handleFriendRequest = useCallback(
    async type => {
      try {
        await friendRequest({ receiverId: { receiverId: profileUser?.id }, type }).unwrap();
      } catch (error) {
        console.log('handleFriendRequest error: ', error);
      }
    },
    [friendRequest, profileUser?.id]
  );

  // the context - the values passed to the provider and downwards to it's children
  const profileContext = useMemo(
    () => ({
      getUserError,
      username,
      getUserLoading,
      handleFriendRequest,
      friendRequestLoading,
      visitor,
      profileUser,
    }),
    [
      getUserError,
      username,
      getUserLoading,
      handleFriendRequest,
      friendRequestLoading,
      visitor,
      profileUser,
    ]
  );

  return <ProfileContext.Provider value={profileContext}>{props.children}</ProfileContext.Provider>;
};
