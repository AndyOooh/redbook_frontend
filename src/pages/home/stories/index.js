import { useMediaQuery } from 'react-responsive';

import { ArrowRight, Plus } from 'assets/svg';
import { stories } from '../homeData';
import Story from './Story';
import './style.scss';

export default function Stories() {
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
  return (
    <div className='stories'>
      <div className='create_story_card'>
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
  );
}
