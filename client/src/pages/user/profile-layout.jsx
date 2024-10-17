import { useProfile } from '@/hooks/use-users';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  RiProfileFill,
  RiHistoryFill,
  RiFileList3Fill,
} from 'react-icons/ri';
import {
  FaFileMedicalAlt,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import {
  MdPayment,
  MdArrowForwardIos,
} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import defaultAvatar from '@/assets/avatar/default.png';

const ProfileLayout = () => {
  const logOut = useAuthStore((state) => state.logOut);
  const fullName = useAuthStore((state) => state.fullName);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  // Get the user's profile data
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
    isError: isProfileError,
  } = useProfile();

  // Sidebar items
  const sidebarItems = [
    {
      title: 'Personal Information',
      icon: RiProfileFill,
      link: '/profile',
    },
    {
      title: 'Medical History',
      icon: FaFileMedicalAlt,
      link: '/profile/history',
    },
    {
      title: 'Treatments',
      icon: RiHistoryFill,
      link: '/profile/treatments',
    },
    {
      title: 'Appointments',
      icon: RiFileList3Fill,
      link: '/profile/appointments',
    },
    {
      title: 'Payement Method',
      icon: MdPayment,
      link: '/profile/payment',
    },
    {
      title: 'FAQs',
      icon: FaQuestionCircle,
      link: '/profile/faqs',
    },
  ];

  // Log Out and then toast a message
  const logoutHandler = () => {
    logOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {profile && (
        <aside
          id="default-sidebar"
          className="hidden sm:block left-0 z-40 w-80 min-h-screen border-r border-gray-200 bg-white"
          aria-label="Sidebar"
        >
          <div className="h-full px-0 py-4 overflow-y-auto">
            {/* Profile Image */}
            <div className="flex items-center justify-center mt-6 mb-4">
              <img
                src={
                  profile.profileImg !== 'default'
                    ? profile.profileImg
                    : defaultAvatar
                }
                alt="avatar"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
            </div>
            {/* Profile Name */}
            <div className="text-center text-xl font-semibold">
              {fullName}
            </div>
            <ul className="space-y-0 font-medium mt-6">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  <li>
                    <Link
                      to={item.link}
                      className="flex items-center py-5 px-4 text-gray-900 rounded-lg hover:bg-gray-100 group justify-between"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-10 h-10 text-blue-400 group-hover:text-blue-700 bg-blue-100 p-2 rounded-full" />
                        <span className="ms-3">
                          {item.title}
                        </span>
                      </div>
                      {/* Move arrow to right border */}
                      <div className="flex items-center">
                        <MdArrowForwardIos
                          className={`w-4 h-4 text-gray-500 group-hover:mr-0 ${pathname === item.link ? 'mr-0' : 'mr-3'}`}
                        />
                      </div>
                    </Link>
                  </li>
                  <hr className="my-0 mx-4" />
                </div>
              ))}
              <li>
                <div
                  onClick={logoutHandler}
                  className="flex items-center px-4 py-5 text-gray-900 rounded-lg hover:bg-gray-100 group hover:cursor-pointer"
                >
                  <FaSignOutAlt className="w-10 h-10 text-blue-500 group-hover:text-blue-700 bg-blue-100 p-2 rounded-full" />
                  <span className="ms-3">Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {/* Main content section */}
      <div className="flex-1 p-4">
        {isLoadingProfile && (
          <div className="flex items-center justify-center">
            <LoadingSpinner className="w-36 h-36 my-10" />
          </div>
        )}
        {isProfileError && (
          <div className="text-red-500">
            <p>Error: {profileError.message}</p>
          </div>
        )}
        {profile && <Outlet />}
      </div>
    </div>
  );
};

export default ProfileLayout;
