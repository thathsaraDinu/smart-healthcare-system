import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AvatarIcon() {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const navigate = useNavigate();
  const logOut = useAuthStore((state) => state.logOut);

  const logOutHandler = () => {
    logOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div>
      {/* Logged in */}
      {isLoggedIn && (
        <Button
          onClick={logOutHandler}
          variant="destructive"
        >
          Log out
        </Button>
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
