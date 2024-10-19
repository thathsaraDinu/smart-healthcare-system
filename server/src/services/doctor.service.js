import Doctor from '../models/user-models/doctor.model.js';

export const getSchedules = async (data) => {
  const schedules = await Doctor.findById(data).select(
    'fullName gender specialization hospitalDetails '
  );

  return schedules;
};
