import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RiArrowDropUpLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/tailwind-merge';
import { useAuthStore } from '@/store/auth-store';
import Logo from '@/assets/logo/logo.png';
import { USER_ROLES } from '@/constants';
import {
  MdCalendarMonth,
  MdLogout,
  MdPerson,
  MdSpaceDashboard,
  MdVerifiedUser,

  // MdSettings,
} from 'react-icons/md';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const sideBarItems = [
  {
    title: 'Dashboard',
    icon: <MdSpaceDashboard />,
    submenu: [],
    to: '/',
    roles: [
      USER_ROLES.DOCTOR,
      USER_ROLES.ADMIN,
      USER_ROLES.MEDICAL_STAFF,
    ],
  },
  {
    title: 'Appointments',
    icon: <MdCalendarMonth />,
    submenu: [],
    to: '/all-appointments',
    roles: [USER_ROLES.ADMIN],
  },
  {
    title: 'Doctors',
    icon: <MdVerifiedUser />,
    submenu: [],
    to: '/all-doctors',
    roles: [USER_ROLES.ADMIN],
  },
  {
    title: 'Patients',
    icon: <MdPerson />,
    submenu: [],
    to: '/all-patients',
    roles: [USER_ROLES.ADMIN],
  },
  {
    title: 'Patients',
    icon: <MdCalendarMonth />,
    submenu: [],
    to: '/patients',
    roles: [USER_ROLES.MEDICAL_STAFF],
  },
];

const SideBar = () => {
  const logOut = useAuthStore((state) => state.logOut);
  const path = useLocation().pathname;

  const navigate = useNavigate();

  const [openSubmenuIndex, setOpenSubmenuIndex] =
    useState(null);
  const role = useAuthStore((state) => state.role);

  const handleSubmenuToggle = (index) => {
    setOpenSubmenuIndex(
      openSubmenuIndex === index ? null : index,
    );
  };

  // Log Out and then toast a message
  const logOutHandler = () => {
    logOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <aside className="min-w-52 max-w-60 h-screen z-40">
      <div className="flex-col flex h-full">
        <div className="bg-white drop-shadow-sm">
          <div>
            <Link
              to="/"
              className="flex items-center justify-center mx-5 my-10 text-white gap-2"
            >
              <img
                src={Logo}
                alt="logo"
                className="h-12 w-12 rounded-sm"
              />
              <div className="text-[#010F27] text-2xl font-bold">
                SmartMedix
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-white px-3 py-4 overflow-y-scroll no-scrollbar sidebar-scroll">
          <ul className="space-y-0 font-semibold">
            {sideBarItems.map((item, index) => (
              <li key={index}>
                {item.roles?.includes(role) && (
                  <div className="flex flex-col">
                    <Link
                      to={item.to}
                      onClick={(e) => {
                        if (item.submenu.length > 0) {
                          e.preventDefault();
                          handleSubmenuToggle(index);
                        }
                      }}
                      className={cn(
                        'flex h-16 items-center w-full p-2 text-base text-grey-600 font-medium grow transition duration-75 rounded-lg group hover:bg-blue-200  hover:text-black',
                        path === item.to
                          ? ' text-blue-500'
                          : '',
                      )}
                    >
                      {item.icon}
                      <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                        {item.title}
                      </span>
                      {item.submenu.length > 0 && (
                        <span className="text-white">
                          {openSubmenuIndex === index ? (
                            <RiArrowDropUpLine size={30} />
                          ) : (
                            <RiArrowDropDownLine
                              size={30}
                            />
                          )}
                        </span>
                      )}
                    </Link>
                    {item.submenu.length > 0 && (
                      <ul
                        className={`pl-4 ${
                          openSubmenuIndex === index
                            ? 'max-h-auto'
                            : 'max-h-0'
                        } overflow-hidden transition-all duration-300 ease-in-out`}
                        style={{
                          transitionProperty: 'max-height',
                          transitionDuration: '0.6s',
                          transitionTimingFunction:
                            'ease-in-out',
                        }}
                      >
                        {item.submenu.map(
                          (subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.to}
                                className={cn(
                                  'flex h-16 items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-[#fcb308] hover:text-black',
                                  path === subItem.to
                                    ? ' text-[#fcb308]'
                                    : '',
                                )}
                              >
                                <span className="flex-1 ms-3 text-left text-sm rtl:text-right whitespace-nowrap">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
            {/* Log Out */}
            <li>
              <div className="flex flex-col hover:cursor-pointer">
                <div
                  onClick={logOutHandler}
                  className={cn(
                    'flex h-16 items-center w-full p-2 text-base text-grey-600 font-medium grow transition duration-75 rounded-lg group hover:bg-blue-200  hover:text-black',
                  )}
                >
                  <MdLogout />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Log Out
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
