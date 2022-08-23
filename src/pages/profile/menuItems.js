import { ProfilePosts } from './Sections/ProfilePosts/ProfilePosts';
// import { Posts } from '../../features/posts/components/Posts';

import { About } from './Sections/About';
import { Friends } from './Sections/Friends';
import { Photos } from './Sections/Photos';
import { Videos } from './Sections/Videos';

// const componetFn = (props, Component) => {
//   return <Component {...props} />;
// };

export const menuItems = [
  // { name: 'Posts', link: '', component: componetFn(props, <Posts />) },
  { name: 'Posts', link: '', component: props => <ProfilePosts {...props} /> },

  { name: 'About', link: 'about', component: () => <About /> },
  { name: 'Friends', link: 'friends', component: () => <Friends /> },
  { name: 'Photos', link: 'photos', component: () => <Photos /> },
  { name: 'Videos', link: 'videos', component: () => <Videos /> },
  // { name: 'Check-ins', link: 'check-ins' },
  // { name: 'More', link: '/' },
];
