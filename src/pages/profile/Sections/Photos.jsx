import React from 'react';
import { Link } from 'react-router-dom';

export const Photos = ({ photos }) => {
  return (
    <>
      <div className='card_header'>
        <span className='card_title'>Photos</span>
        <Link className='blue_link' to='photos'>
          See all photos
        </Link>
      </div>
    </>
  );
};
