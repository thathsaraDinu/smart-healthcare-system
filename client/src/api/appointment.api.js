import { instance } from '@/hooks/use-axios';

export const makeAppointment = async (data) => {
  const response = await instance.post(
    '/api/appointment',
    data,
  );

  return response.data;
};
