import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '@/assets/avatar/default.png';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

export default function AvatarIcon() {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const navigate = useNavigate();
  const image = useAuthStore((state) => state.image);

  return (
    <div className="flex items-center gap-4">
      {/* Logged in */}
      {isLoggedIn && (
        <Avatar
          onClick={() => navigate('/profile')}
          className="cursor-pointer"
        >
          <AvatarImage
            src={
              image !== 'default' ? image : defaultAvatar
            }
            alt="avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      {/* Not logged in */}
      {!isLoggedIn && (
        <div>
          <Button
            onClick={() => navigate('/register')}
            variant="ghost"
            className="text-blue-500 hover:text-blue-600"
          >
            SIGN UP
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            className="ml-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            LOG IN
          </Button>
        </div>
      )}
    </div>
  );
}
