import { userLogout } from '@/api/auth.api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the initial state
const initialState = {
  isLoggedIn: false,
  accessToken: null,
  role: null,
  fullName: null,
  id: null,
  image: null,
};

// Create the store with the persist middleware
export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      login: (accessToken, role) => {
        set({
          isLoggedIn: true,
          accessToken: accessToken,
          role: role,
          fullName: null,
          id: null,
          image: null,
        });
      },
      profile: (data) => {
        set({
          role: data.role,
          fullName: data.fullName,
          id: data.id,
          image: data.profileImg,
        });
      },
      logOut: () => {
        userLogout();
        set({
          isLoggedIn: false,
          accessToken: null,
          role: null,
          fullName: null,
          id: null,
          image: null,
        });
        localStorage.clear();
      },
    }),
    {
      name: 'auth-store', // Key in local storage
      blacklist: ['isLoggedIn'], // Do not persist `isLoggedIn` in local storage
    },
  ),
);
