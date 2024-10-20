import Appointment from '../models/appointment.model.js';

// Create a new appointment with the given data
export const create = async (data) => {
  // Create and save the appointment to the database
  const appointment = await Appointment.create(data);

  // Return the newly created appointment
  return appointment;
};

// Get appointments by the user's ID
export const getById = async (id) => {
  // Find all appointments for the given user ID
  const appointment = await Appointment.find({ user: id });

  // If no appointment is found, throw an error
  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  // Return the found appointment(s)
  return appointment;
};

// Update an appointment by its ID with the given data
export const updateById = async (id, data) => {
  // Find and update the appointment, returning the updated version
  const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

  // If no appointment is found, throw an error
  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  // Return the updated appointment
  return appointment;
};

// Delete an appointment by its ID
export const deleteById = async (id) => {
  // Find and delete the appointment by ID
  const appointment = await Appointment.findByIdAndDelete(id);

  // If no appointment is found, throw an error
  if (!appointment) {
    throw { message: 'Appointment not found' };
  }

  // Return the deleted appointment (or confirmation)
  return appointment;
};

// Change the payment status of an appointment
export const changePaymentStatus = async (id, status) => {
  // Find the appointment by ID and update its payment status
  const appointment = await Appointment.findByIdAndUpdate(id, { ispaid: status }, { new: true });

  // Return the updated appointment with the new payment status
  return appointment;
};
