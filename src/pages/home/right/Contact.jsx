import { ProfileImage } from 'components/ProfileImage';

export default function Contact({ user }) {
  return (
    <div className='contact hover3'>
      <ProfileImage image={user?.pictures[0].url} size='3rem' />
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
