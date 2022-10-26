import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createDetailsArray } from './createDetailsArray';
import { selectCurrentUser } from 'features/auth/authSlice';
import { useFriendRequestMutation, useGetUserQuery } from 'features/users/usersApiSlice';
import { ProfileContext } from './profileContext';

export const ProfileProvider = ({ children }) => {
  const [visitor, setVisitor] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const user = useSelector(selectCurrentUser);
  const { username } = useParams();
  const [detailsArray, setDetailsArray] = useState(null);

  const [updatedDetails, setUpdatedDetails] = useState({});
  const [showDetailInput, setShowDetailInput] = useState('');

  const resetDetails = useCallback(() => {
    setShowDetailInput('');
    setUpdatedDetails({});
  }, []);

  const handleShowDetailsInput = useCallback(
    detailName => {
      showDetailInput !== detailName ? setShowDetailInput(detailName) : resetDetails();
    },
    [resetDetails, showDetailInput]
  );

  useEffect(() => {
    setVisitor(username ? username !== user.username : false);
  }, [username, user.username]);

  // Should this go inside a useEffect? Or use a useMemo?
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

  useEffect(() => {
    if (profileUser) {
      setDetailsArray(createDetailsArray(profileUser.details));
    }
  }, [profileUser]);

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
      detailsArray,

      updatedDetails,
      setUpdatedDetails,
      resetDetails,
      showDetailInput,
      setShowDetailInput,
      handleShowDetailsInput,
    }),
    [
      getUserError,
      username,
      getUserLoading,
      handleFriendRequest,
      friendRequestLoading,
      visitor,
      profileUser,
      detailsArray,

      updatedDetails,
      setUpdatedDetails,
      resetDetails,
      showDetailInput,
      setShowDetailInput,
      handleShowDetailsInput,
    ]
  );

  return <ProfileContext.Provider value={profileContext}>{children}</ProfileContext.Provider>;
};
