import {
  getAppointmentStats,
  getAllAppointments,
} from '../services/report.service.js';

// Get all appointments
export async function getAllAppointmentsController(req, res) {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get appointment stats
export async function getAppointmentStatsController(req, res) {
  try {
    const stats = await getAppointmentStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
