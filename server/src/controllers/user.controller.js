import * as userService from '../services/user.service.js';

const UserController = {
  // Register a new user
  // Anyone can register
  register: async (req, res) => {
    try {
      const user = await userService.register(req.body);
      return res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get user profile details
  // Only authenticated users can access
  profile: async (req, res) => {
    try {
      const user = await userService.getProfile(req.user.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get user profile by id
  // Only authenticated users can access
  getProfileById: async (req, res) => {
    try {
      const user = await userService.getProfile(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all users
  // Only authenticated users can access
  getUsers: async (req, res) => {
    try {
      const { role } = req.query;
      const users = await userService.getUsers(role);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all doctors
  // Anyone can access
  getDoctors: async (req, res) => {
    try {
      const doctors = await userService.getDoctors();
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Update user profile
  // Only authenticated users can access
  updateProfile: async (req, res) => {
    try {
      const user = await userService.updateProfile(req.user.id, req.user.role, req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default UserController;
