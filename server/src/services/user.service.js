import UserSchema from '../models/user-models/user.model.js';
import Patient from '../models/user-models/patient.model.js';
import Doctor from '../models/user-models/doctor.model.js';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/constants.js';

// Register a new user
export const register = async (data) => {
  try {
    // Check if the user already exists
    const exitistingUser = await UserSchema.findOne({
      email: data.email
    });

    if (exitistingUser) {
      throw {
        status: 400,
        message: 'User already exists'
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let user;

    switch (data.role) {
      case USER_ROLES.USER:
        user = new Patient({
          ...data,
          password: hashedPassword
        });
        break;

      case USER_ROLES.DOCTOR:
        user = new Doctor({
          ...data,
          password: hashedPassword
        });
        break;

      default:
        throw {
          status: 400,
          message: 'Invalid role'
        };
    }

    // If Schema validation fails, throw an error
    const error = user.validateSync();
    if (error) {
      throw {
        status: 400,
        message: 'Validation failed'
      };
    }

    // Save the user object to the database
    await user.save();

    return user;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get user profile details
export const getProfile = async (id) => {
  try {
    // Find the user by ID
    const user = await UserSchema.findById(id);

    // If the user is not found, throw an error
    if (!user) {
      throw {
        status: 404,
        message: 'User not found'
      };
    }

    // Return only the necessary user details
    if (user.role === USER_ROLES.USER) {
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        gender: user.gender,
        mobile: user.mobile,
        profileImg: user.profileImg,
        dob: user.dob,
        patientId: user.patientId,
        maritalStatus: user.maritalStatus,
        physicianName: user.physicianName,
        physicianMobile: user.physicianMobile,
        emergencyContact: user.emergencyContact
      };
    } else {
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        gender: user.gender,
        mobile: user.mobile,
        profileImg: user.profileImg
      };
    }
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get profile by email
export const getUserByEmail = async (email) => {
  try {
    // Find the user by email
    const user = await UserSchema.findOne({
      email
    });

    // If the user is not found, throw an error
    if (!user) {
      throw {
        status: 404,
        message: 'User not found'
      };
    }

    // Return only the necessary user details
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get all users with query params
export const getUsers = async (role) => {
  try {
    // Find all users with the specified role
    const users = await UserSchema.find({
      role
    });

    // Return only the necessary user details
    return users.map((user) => ({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      gender: user.gender,
      mobile: user.mobile,
      ...(user.role === USER_ROLES.USER && {
        dob: user.dob,
        maritalStatus: user.maritalStatus
      })
    }));
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get all doctors
export const getDoctors = async () => {
  try {
    // Find all users with the role of a doctor and remove the password field
    const doctors = await Doctor.find().select('-password');

    return doctors;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Update user profile
export const updateProfile = async (id, role, data) => {
  try {
    let updateUser;

    // Check object id is valid
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw {
        message: 'Invalid ID'
      };
    }

    // Check role included in USER_ROLES
    if (!Object.values(USER_ROLES).includes(role)) {
      throw {
        message: 'Invalid role'
      };
    }

    if (role === USER_ROLES.USER) {
      updateUser = Patient.findByIdAndUpdate(id, data, {
        new: true
      });
    } else {
      updateUser = Doctor.findByIdAndUpdate(id, data, {
        new: true
      });
    }

    // Find the user by ID and update
    const user = await updateUser;

    // If the user is not found, throw an error
    if (!user) {
      throw {
        status: 404,
        message: 'User not found'
      };
    }

    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Delete user by ID
export const deleteUser = async (id) => {
  try {
    // Find the user by ID and delete
    const user = await UserSchema.findByIdAndDelete(id);

    // If the user is not found, throw an error
    if (!user) {
      throw {
        status: 404,
        message: 'User not found'
      };
    }

    // Return only the necessary user details
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message
    };
  }
};
