import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth-store';
import { USER_ROLES } from './constants';
import Sidebar from './components/sidebar/sidebar';
import DashboardNavbar from './components/navbar/dashboard-navbar';
import { useQuery } from '@tanstack/react-query';
import { getProfileData } from './api/user.api';
import { LoadingSpinner } from './components/ui/spinner';
import { useEffect } from 'react';

const Layout = () => {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);
  const setProfile = useAuthStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logOut);

  // If user is logged in, fetch the profile data
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    isSuccess: profileSuccess,
  } = useQuery({
    queryKey: ['profile', isLoggedIn],
    queryFn: getProfileData,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (profileSuccess) {
      setProfile(profile);
    }
  }, [profile, profileSuccess, setProfile]);

  if (profileLoading) {
    return <LoadingSpinner />;
  }

  if (profileError) {
    logout();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* User  Layout */}
      {!isLoggedIn || role === USER_ROLES.USER ? (
        <div>
          <Navbar />
          <div className="flex-grow min-h-[calc(100vh-137px)]">
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : // Admin Layout
      (isLoggedIn && role === USER_ROLES.ADMIN) ||
        role === USER_ROLES.SUPER_ADMIN ? (
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col overflow-y-auto">
            <DashboardNavbar />
            <div className="overflow-y-auto p-4">
              <Outlet />
            </div>
          </div>
        </div>
      ) : null}
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default Layout;
