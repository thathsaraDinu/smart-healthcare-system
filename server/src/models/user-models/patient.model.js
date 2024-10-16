import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from '../../constants/constants.js';

const PatientSchema = new Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    default: 'P100000'
  },
  dob: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  physicianName: {
    type: String,
    required: false
  },
  physicianMobile: {
    type: String,
    required: false
  },
  emergencyContact: {
    type: String,
    required: true
  }
});

export default mongoose.models.User.discriminator(USER_ROLES.USER, PatientSchema);
