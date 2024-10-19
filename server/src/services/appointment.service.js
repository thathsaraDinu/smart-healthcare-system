import Appointment from '../models/appointment.model.js';

export const create = async (data) => {
  const appointment = await Appointment.create(data);

  return appointment;
};

export const getById = async (id) => {
  const appointment = await Appointment.find({ user: id });

  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  return appointment;
};

export const updateById = async (id, data) => {
  const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  return appointment;
};

export const deleteById = async (id) => {
  const appointment = await Appointment.findByIdAndDelete(id);

  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  return appointment;
};

// Change payment status
export const changePaymentStatus = async (id, status) => {
  const appointment = await Appointment.findByIdAndUpdate(id, { ispaid: status }, { new: true });

  return appointment;
};
