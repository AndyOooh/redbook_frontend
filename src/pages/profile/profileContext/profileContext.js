const { createContext } = require('react');

export const ProfileContext = createContext({
  getUserError: null,
  username: null,
  getUserLoading: null,
  handleFriendRequest: () => {},
  friendRequestLoading: null,
  visitor: null,
  profileUser: null,
  detailsArray: null,

  updatedDetails: null,
  setUpdatedDetails: () => {},
  resetDetails: () => {},

  showDetailInput: null,
  setShowDetailInput: () => {},
  handleShowDetailsInput: () => {},
});
