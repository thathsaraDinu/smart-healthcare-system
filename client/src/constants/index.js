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
      title: 'Appointments',
      url: '/appointments',
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
      title: 'My Appointments',
      url: '/myappointments',
    },
    {
      title: 'Doctors',
      url: '/appointments',
    },
    {
      title: 'About Us',
      url: '/about',
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

// Gender enums
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

// Marital Status enums
export const MARITAL_STATUS = {
  SINGLE: 'single',
  MARRIED: 'married',
  DIVORCED: 'divorced',
  WIDOWED: 'widowed',
};

// Account Status enums
export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
};
