import { Outlet } from 'react-router-dom';
import { ProfileProvider } from './profileContext/ProfileProvider';

export const ProfileLayout = () => {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
};
