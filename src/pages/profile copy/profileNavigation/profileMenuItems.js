import { ProfilePosts } from '../sections/posts/ProfilePosts';
import { ProfileAbout } from '../sections/about/ProfileAbout';
import { ProfileFriends } from '../sections/friends/ProfileFriends';
import { ProfilePhotos } from '../sections/photos/ProfilePhotos';
import { ProfileVideos } from '../sections/videos/ProfileVideos';

// const componetFn = (props, Component) => {
//   return <Component {...props} />;
// };

// NB do not prepend links with /. Without it, it's a relative link, ie. it will be added to parent route

export const profileMenuItems = [
  // { name: 'Posts', link: '', component: componetFn(props, <Posts />) },
  { name: 'Posts', link: '', component: props => <ProfilePosts {...props} /> },
  { name: 'About', link: 'about', component: props => <ProfileAbout {...props} /> },
  
  { name: 'Friends', link: 'friends', component: () => <ProfileFriends /> },
  { name: 'Photos', link: 'photos', component: props => <ProfilePhotos {...props} /> },
  { name: 'Videos', link: 'videos', component: () => <ProfileVideos /> },

  // { name: 'Check-ins', link: 'check-ins' },
  // { name: 'More', link: '/' },
];
