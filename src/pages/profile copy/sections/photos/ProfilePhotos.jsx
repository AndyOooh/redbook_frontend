import React from 'react';
import { Photos } from './Photos';

export const ProfilePhotos = props => {
  console.log('🚀 ~ file: ProfilePhotos.jsx ~ line 5 ~ props', props);
  return <Photos {...props} />;
};
