import { useMediaQuery } from 'react-responsive';

import { ArrowRight, Plus } from 'assets/svg';
import { stories } from '../homeData';
import Story from './Story';
import './Top.scss';
import { useState } from 'react';

export default function Stories() {
  const [activeMedia, setActiveMedia] = useState('stories');

  const handleMediaChange = media => {
    setActiveMedia(media);
  };

  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)',
  });
  const query103rem = useMediaQuery({
    query: '(max-width: 103rem)',
  });
  const query96rem = useMediaQuery({
    query: '(max-width: 96rem)',
  });
  const query885px = useMediaQuery({
    query: '(max-width: 885px)',
  });
  const max = query885px ? 5 : query96rem ? 4 : query103rem ? 5 : query1175px ? 4 : stories.length;

  // const buttonClasses = 

  return (
    <section className='home_media home_card'>
      <div className='media_options'>
        {/* Change buttons to Navlink to use active class?  */}
        <div className='button_wrap active'>
          <button className='media_option ' type='button'>
            Stories
          </button>
        </div>
        <div className='button_wrap'>
          <button className='media_option' type='button'>
            Reels
          </button>
        </div>
        <div className='button_wrap'>
          <button className='media_option' type='button'>
            Rooms
          </button>
        </div>
      </div>
      <div className='vert_line'></div>
      <div className=' media_grid'>
        <div className=' media_card create_story_card'>
          <img src='../../../images/default_pic.png' alt='' className='create_story_img' />
          <div className='plus_story'>
            <Plus color='#fff' />
          </div>
          <div className='story_create_text'>Create Story</div>
        </div>
        {stories.slice(0, max).map((story, i) => (
          <Story story={story} key={story.profile_name} />
        ))}
        {/* <div className='white_circle'>
        <ArrowRight color='#65676b' />
      </div> */}
      </div>
    </section>
  );
}
