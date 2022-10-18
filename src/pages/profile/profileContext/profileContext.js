const { createContext } = require('react');

export const ProfileContext = createContext({
  visitor: true,
  setVisitor: () => {},
  profileUser: null,
  setProfileUser: () => {},
  arr: [],
});
