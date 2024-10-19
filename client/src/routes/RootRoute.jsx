import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';
import { USER_ROLES } from '@/constants';
import { lazy } from 'react';

// Admin page
const Overview = lazy(
  () => import('@/pages/dashboard/admin-dashboard/overview'),
);

// Home page
const Home = lazy(() => import('@/pages/home/home'));
const Dashboard = lazy(
  () => import('@/pages/dashboard/dashboard'),
);

const RootRoute = () => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-32 h-32" />
      </div>
    );
  }

  return isAuthenticated && role === USER_ROLES.USER ? (
    <Home />
  ) : isAuthenticated && role === USER_ROLES.DOCTOR ? (
    <Dashboard />
  ) : isAuthenticated && role === USER_ROLES.ADMIN ? (
    <Overview />
  ) : (
    <Home />
  );
};

export default RootRoute;
