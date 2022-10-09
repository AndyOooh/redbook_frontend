import { Friends } from '../Friends/Friends';
import { About } from './About';

export const ProfileAbout = props => {
  return (
    <>
      <About {...props} />
      <Friends />
    </>
  );
};
