import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';
import AvatarIcon from '@/components/navbar/auth-button';
import { useAuthStore } from '@/store/auth-store';
import { MENU_ITEMS } from '@/constants';

export default function Navbar() {
  // Check if user is authenticated
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-blue-500 text-2xl font-extrabold">
              Health
            </div>
            <div className="text-blue-900 text-2xl font-extrabold">
              Care
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {/* Menu Items map */}
          {!isAuthenticated &&
            MENU_ITEMS.ALL.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-blue-500 hover:text-blue-900"
              >
                {item.title}
              </Link>
            ))}

          {isAuthenticated &&
            role === 'user' &&
            MENU_ITEMS.USER.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-blue-500 hover:text-blue-900"
              >
                {item.title}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <FiSearch className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <AvatarIcon />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MdMenu className="h-5 w-5 text-gray-800" />
                <span className="sr-only">
                  Toggle navigation menu
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {/* Menu Items map */}
                {MENU_ITEMS.ALL.map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.title}
                  </Link>
                ))}
                {isAuthenticated &&
                  MENU_ITEMS.USER.map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
