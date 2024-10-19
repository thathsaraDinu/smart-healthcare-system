import Patient from '../models/user-models/patient.model.js';
import Doctor from '../models/user-models/doctor.model.js';
import UserSchema from '../models/user-models/user.model.js';

class UserRepository {
  async createUser(user) {
    return await user.save();
  }

  async findUserById(id) {
    return await UserSchema.findById(id);
  }

  async findUserByEmail(email) {
    return await UserSchema.findOne({ email });
  }

  async findUsersByRole(role) {
    return await UserSchema.find({ role });
  }

  async updateUserProfile(id, data) {
    return await Patient.findByIdAndUpdate(id, data, { new: true });
  }

  async updateDoctorProfile(id, data) {
    return await Doctor.findByIdAndUpdate(id, data, { new: true });
  }

  async findByIdAndDeleteProfile(id) {
    return await UserSchema.findByIdAndDelete(id);
  }

  async getLastPatientId() {
    const patient = await Patient.find().sort({ patientId: -1 }).limit(1);
    if (!patient.length) return 'P100000';
    return patient[0].patientId;
  }
}

export default new UserRepository(); // Singleton pattern
