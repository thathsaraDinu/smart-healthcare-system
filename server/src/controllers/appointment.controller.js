import { create, getById, updateById, deleteById } from '../services/appointment.service.js';

const AppointmentController = {
  // Create a new appointment
  makeAppointment: async (req, res) => {
    try {
      // Create a new appointment using request body and user's ID
      const appointment = await create({ ...req.body, user: req.user.id });

      // Send success response with created appointment
      return res.status(200).json(appointment);
    } catch (error) {
      // Handle errors and send error response
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all appointments for the logged-in user
  getUserAppointments: async (req, res) => {
    try {
      // Fetch appointments based on the user's ID
      const appointment = await getById(req.user.id);

      // Send success response with the retrieved appointments
      return res.status(200).json(appointment);
    } catch (error) {
      // Handle errors and send error response
      return res.status(500).json({ message: error.message });
    }
  },

  // Update an existing appointment by its ID
  updateAppointment: async (req, res) => {
    try {
      // Update the appointment by its ID using request parameters and body
      const appointment = await updateById(req.params.id, req.body);

      // Send success response with the updated appointment
      return res.status(200).json(appointment);
    } catch (error) {
      // Handle errors and send error response
      return res.status(500).json({ message: error.message });
    }
  },

  // Delete an appointment by its ID
  deleteAppointment: async (req, res) => {
    try {
      // Delete the appointment using the provided ID from request parameters
      const appointment = await deleteById(req.params.id);

      // Send success response with deleted appointment info
      return res.status(200).json(appointment);
    } catch (error) {
      // Handle errors and send error response
      return res.status(500).json({ message: error.message });
    }
  }
};

export default AppointmentController;
