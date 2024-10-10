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
        });
      },
      profile: (data) => {
        set({
          role: data.role,
          fullName: data.firstName + ' ' + data.lastName,
          id: data.id,
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
