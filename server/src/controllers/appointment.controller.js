import { create, getById, updateById, deleteById } from '../services/appointment.service.js';

const AppointmentController = {
  makeAppointment: async (req, res) => {
    try {
      const appointment = await create({ ...req.body, user: req.user.id });

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getUserAppointments: async (req, res) => {
    try {
      const appointment = await getById(req.user.id);

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const appointment = await updateById(req.params.id, req.body);
      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const appointment = await deleteById(req.params.id);

      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default AppointmentController;
