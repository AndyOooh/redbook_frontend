import { useState } from 'react';

export const BackgroundSelector = ({ changeBackground }) => {
  const [backgroundsVisible, setBackgroundsVisible] = useState(false);

  const postBackgrounds = [
    'images/postBackgrounds/1.jpg',
    'images/postBackgrounds/2.jpg',
    'images/postBackgrounds/3.jpg',
    'images/postBackgrounds/4.jpg',
    'images/postBackgrounds/5.jpg',
    'images/postBackgrounds/6.jpg',
    'images/postBackgrounds/7.jpg',
    'images/postBackgrounds/8.jpg',
    'images/postBackgrounds/9.jpg',
  ];

  return (
    <>
      <img
        src='icons/colorful.png'
        alt=''
        onClick={() => setBackgroundsVisible(!backgroundsVisible)}
      />
      {backgroundsVisible &&
        postBackgrounds.map((bg, i) => (
          <img
            src={bg}
            key={i}
            alt=''
            onClick={() => {
              changeBackground(i);
            }}
          />
        ))}
    </>
  );
};
