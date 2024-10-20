import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from '../../constants/constants.js';
import User from './user.model.js';

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
  },
  medicalData: {
    bloodGroup: {
      type: String,
      required: false
    },
    weight: {
      type: Number,
      required: false
    },
    allergies: {
      type: [String],
      required: false
    },
    cardiovascular: {
      type: [String],
      required: false
    },
    otherCondition: {
      type: [String],
      required: false
    },
    specialNote: {
      type: String,
      required: false
    }
  }
});

const Patient = User.discriminator(USER_ROLES.USER, PatientSchema);

export default Patient;

// export default mongoose.models.User.discriminator(USER_ROLES.USER, PatientSchema);
