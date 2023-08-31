import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    // Create an avatar with the user's profile image
    <Avatar className='w-8 h-8'>
      <AvatarImage
        src={user?.profileImageUrl}
      />
      // If the user doesn't have a
      profile image, fallback to their
      initials
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
