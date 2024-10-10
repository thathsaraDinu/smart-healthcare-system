import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SignedAvatarImg from '@/assets/avatar/logged-in.png';
import AvatarImg from '@/assets/avatar/avatar.png';
import { useAuthStore } from '@/store/auth-store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AvatarIcon() {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const fullName = useAuthStore((state) => state.fullName);
  const navigate = useNavigate();
  const logOut = useAuthStore((state) => state.logOut);

  const logOutHandler = () => {
    logOut();
    toast.success('Logged out successfully');
    navigate('/');
    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 1000);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 hover:cursor-pointer">
            {isLoggedIn ? (
              <AvatarImage
                src={SignedAvatarImg}
                alt="User's avatar"
              />
            ) : (
              <AvatarImage
                src={AvatarImg}
                alt="User's avatar"
              />
            )}

            <span className="sr-only">
              Toggle user menu
            </span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {isLoggedIn ? (
            <DropdownMenuGroup>
              <DropdownMenuItem className="font-bold">
                <span className="font-bold">
                  {fullName}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick={logOutHandler}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Register
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
