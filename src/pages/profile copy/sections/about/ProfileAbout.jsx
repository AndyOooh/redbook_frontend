import { Friends } from '../friends/Friends';
import { About } from './About';

export const ProfileAbout = props => {
  return (
    <>
      <About {...props} />
      <Friends />
    </>
  );
};
