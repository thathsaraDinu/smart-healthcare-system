import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '@/assets/avatar/default.png';

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
        <img
          onClick={() => navigate('/profile')}
          src={image !== 'default' ? image : defaultAvatar}
          alt="avatar"
          className="rounded-full border-2 border-gray-300 cursor-pointer w-10 h-10"
        />
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
