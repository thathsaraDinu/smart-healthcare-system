import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth-store';
import { USER_ROLES } from './constants';
import Sidebar from './components/sidebar/sidebar';
import DashboardNavbar from './components/navbar/dashboard-navbar';
import { LoadingSpinner } from './components/ui/spinner';
import { useEffect } from 'react';
import { useProfile } from './hooks/use-users';

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
  } = useProfile(isLoggedIn);

  useEffect(() => {
    if (profileSuccess) {
      setProfile(profile);
    }
  }, [profile, profileSuccess, setProfile]);

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-20 h-20" />
      </div>
    );
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
          <div className="flex-grow min-h-[calc(100vh-357px)]">
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : // Admin or Doctor Layout
      (isLoggedIn && role === USER_ROLES.DOCTOR) ||
        role === USER_ROLES.MEDICAL_STAFF ||
        role === USER_ROLES.ADMIN ? (
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
