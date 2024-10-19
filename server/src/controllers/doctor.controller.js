import { getSchedules } from '../services/doctor.service.js';

const DoctorController = {
  // Get channeling schedules of a doctor
  // Anyone can access
  getChannelSchedules: async (req, res) => {
    try {
      const schedules = await getSchedules(req.params.id);

      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default DoctorController;
