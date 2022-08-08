import { Feeling, LiveVideo, Photo } from 'assets/svg';

export const CreatePostBody = () => {

  return (
    <div className='createPost_body'>
      <div className='createPost_icon hover1'>
        <LiveVideo color='#f3425f' />
        Live Video
      </div>
      <div className='createPost_icon hover1'>
        <Photo color='#4bbf67' />
        Photo/Video
      </div>
      <div className='createPost_icon hover1'>
        <Feeling color='#f7b928' />
        Feeling/Activity
      </div>
    </div>
  );
};
