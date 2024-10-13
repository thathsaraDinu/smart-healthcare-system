// Server Base Url
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// NavBar Menu Items
export const MENU_ITEMS = {
  ALL: [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About Us',
      url: '/about',
    },
  ],
  USER: [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Profile',
      url: '/profile',
    },
    {
      title: 'About Us',
      url: '/about',
    },
    {
      title: 'Appointment',
      url: '/appointment',
    },
  ],
};

// User roles enums
export const USER_ROLES = {
  USER: 'user',
  DOCTOR: 'doctor',
  MEDICAL_STAFF: 'medical_staff',
  ADMIN: 'admin',
};
