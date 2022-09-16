import React from 'react';

export const About = props => {
  console.log('🚀 ~ file: About.jsx ~ line 4 ~ props', props);
  const { user } = props;
  return (
    <>
      <h1>About</h1>
      <h1>About</h1>
      <h1>About</h1>
      <h1>About</h1>
      <h1>Username: {user?.username}</h1>
    </>
  );
};
