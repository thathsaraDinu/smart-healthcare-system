import Patient from '../models/user-models/patient.model.js';
import Doctor from '../models/user-models/doctor.model.js';
import { USER_ROLES } from '../constants/constants.js';

export const createUserByRole = (role, userData) => {
  switch (role) {
    case USER_ROLES.USER:
      return new Patient(userData);
    case USER_ROLES.DOCTOR:
      return new Doctor(userData);
    default:
      return new Patient(userData);
  }
};

// Factory Design Pattern
