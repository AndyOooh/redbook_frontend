import { ProfileImage } from "components/ProfileImage";

export default function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <ProfileImage />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
