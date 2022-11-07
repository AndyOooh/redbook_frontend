import { ProfilePosts } from '../sections/posts/ProfilePosts';
import { ProfileAbout } from '../sections/about/ProfileAbout';
import { ProfileFriends } from '../sections/friends/ProfileFriends';
import { ProfilePhotos } from '../sections/photos/ProfilePhotos';
import { ProfileVideos } from '../sections/videos/ProfileVideos';

// NB do not prepend links with /. Without it, it's a relative link, ie. it will be added to parent route
export const profileMenuItems = [
  { name: 'Posts', link: '', component: <ProfilePosts />, index: true },
  { name: 'About', link: 'about', component: <ProfileAbout /> },
  { name: 'Friends', link: 'friends', component: <ProfileFriends /> },
  { name: 'Photos', link: 'photos', component: <ProfilePhotos /> },
  { name: 'Videos', link: 'videos', component: <ProfileVideos /> },
];
