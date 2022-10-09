import { ProfilePosts } from './Sections/ProfilePosts/ProfilePosts';
import { ProfileAbout } from './Sections/About/ProfileAbout';
import { ProfileFriends } from './Sections/Friends/ProfileFriends';
import { ProfilePhotos } from './Sections/Photos/ProfilePhotos';
import { ProfileVideos } from './Sections/Videos/ProfileVideos';

// const componetFn = (props, Component) => {
//   return <Component {...props} />;
// };

// NB do not prepend links with /. Without it, it's a relative link, ie. it will be added to parent route

export const profileMenuItems = [
  // { name: 'Posts', link: '', component: componetFn(props, <Posts />) },
  { name: 'Posts', link: '', component: props => <ProfilePosts {...props} /> },
  { name: 'About', link: 'about', component: props => <ProfileAbout {...props} /> },

  { name: 'Friends', link: 'friends', component: () => <ProfileFriends /> },
  { name: 'Photos', link: 'photos', component: () => <ProfilePhotos /> },
  { name: 'Videos', link: 'videos', component: () => <ProfileVideos /> },

  // { name: 'Check-ins', link: 'check-ins' },
  // { name: 'More', link: '/' },
];
