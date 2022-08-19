import { About } from './Sections/About';
import { Friends } from './Sections/Friends';
import { Photos } from './Sections/Photos';
import { Posts } from './Sections/Posts';
import { Videos } from './Sections/Videos';

export const menuItems = [
  { name: 'Posts', link: '', component: <Posts /> },
  { name: 'About', link: 'about', component: <About /> },
  { name: 'Friends', link: 'friends', component: <Friends /> },
  { name: 'Photos', link: 'photos', component: <Photos /> },
  { name: 'Videos', link: 'videos', component: <Videos /> },
  { name: 'Check-ins', link: 'check-ins' },
  // { name: 'More', link: '/' },
];
