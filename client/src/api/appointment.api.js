import { instance } from '@/hooks/use-axios';

export const makeAppointment = async (data) => {
  const response = await instance.post(
    '/api/appointment',
    data,
  );

  return response.data;
};

export const getAppointments = async () => {
  const response = await instance.get('/api/appointment');

  return response.data;
};

export const updateAppointment = async (id, data) => {
  const response = await instance.put(
    `/api/appointment/${id}`,
    data,
  );
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await instance.delete(
    `/api/appointment/${id}`,
  );

  return response.data;
};
