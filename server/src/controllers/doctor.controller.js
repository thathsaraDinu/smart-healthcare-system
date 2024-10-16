import User from '../models/user.model.js';
import Doctor from '../models/doctor.model.js';

const DoctorController = {
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ firstName: id });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { specialization, hospitalDetails } = req.body;

      const newDoctor = new Doctor({
        user: user._id,
        specialization,
        hospitalDetails
      });

      const savedDoctor = await newDoctor.save();

      res.status(200).json(savedDoctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllDoctors: async (req, res) => {
    try {
      const doctors = await Doctor.find().populate('user', 'firstName lastName profileImg gender');

      if (!doctors.length) {
        return res.status(404).json({ message: 'No doctors found' });
      }

      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default DoctorController;
