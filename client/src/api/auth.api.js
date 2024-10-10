import { instance } from '@/hooks/use-axios';

// Login
export const userLogin = async (data) => {
  const response = await instance.post(`/api/auth`, data, {
    withCredentials: true,
  });

  return response.data;
};

// Refresh Token
export const refreshToken = async () => {
  const response = await instance.get(
    `/api/auth`,
    {},
    { withCredentials: true },
  );

  return response.data;
};

// Logout
export const userLogout = async () => {
  const response = await instance.post(
    `/api/auth/logout`,
    {},
    { withCredentials: true },
  );

  return response.data;
};
