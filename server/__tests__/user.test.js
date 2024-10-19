import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserController from '../src/controllers/user.controller.js';
import Patient from '../src/models/user-models/patient.model.js';
import { jest } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Patient.deleteMany(); // Clear the collection after each test
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Mock Data for testing
// This data will be used to create a new patient
const mockPatient = {
  fullName: 'John Doe',
  role: 'user',
  email: 'user@mail.com',
  password: 'password',
  mobile: '1234567890',
  gender: 'male',
  emergencyContact: '1234567890',
  maritalStatus: 'single',
  dob: '1990-01-01'
};

const mockPatientMissed = {
  fullName: 'John Doe',
  role: 'user',
  email: 'user@mail.com',
  password: 'password',
  mobile: '1234567890',
  gender: 'male',
  emergencyContact: '1234567890',
  maritalStatus: 'single'
  // dob: '1990-01-01' // Missed dob
};

// This data will be used to update the patient profile
const mockPatientUpdate = {
  fullName: 'Jane Doe',
  role: 'user',
  email: 'userupdated@mail.com',
  mobile: '0123456789',
  gender: 'male'
};

// Unit Tests - User Registration
describe('User account based Unit Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {}
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  // Test Suite - Patient Register Tests
  describe('Patient Register Tests', () => {
    // Test Case 1 - Register a new patient with all required fields
    it('Need to register patient successfully (POSITIVE)', async () => {
      mockReq.body = mockPatient;

      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Registration successful' })
      );
    });

    // Test Case 2 - Register a new patient with missing required fields
    it('Need to fail registration due to validation error (NEGATIVE)', async () => {
      mockReq.body = mockPatientMissed;

      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Validation failed' })
      );
    });

    // Test Case 3 - Register a new patient with duplicate email
    it('Need to fail registration due to duplicate email (NEGATIVE)', async () => {
      mockReq.body = mockPatient;

      // First registration
      await UserController.register(mockReq, mockRes);

      // Second registration
      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User already exists' })
      );
    });
  });

  // Test Suite - Patient Update Tests
  describe('Patient Update Tests', () => {
    // Test Case 1 - Update patient profile with all required fields
    it('Need to update patient profile successfully (POSITIVE)', async () => {
      mockReq.body = mockPatient;

      // Register a new patient
      await UserController.register(mockReq, mockRes);

      // Extract registered patient _id
      const registeredPatient = await Patient.findOne({ email: mockPatient.email });

      // Update the patient profile
      mockReq.user = { id: registeredPatient._id, role: 'user' };
      mockReq.body = mockPatientUpdate;

      await UserController.updateProfile(mockReq, mockRes);

      // const updatedPatient = await Patient.findOne({ email: mockPatientUpdate.email });

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    // Test Case 2 - Update patient profile with invalid role
    it('Need to fail update due to invalid role (NEGATIVE)', async () => {
      mockReq.body = mockPatient;

      // Register a new patient
      await UserController.register(mockReq, mockRes);

      // Extract registered patient _id
      const registeredPatient = await Patient.findOne({ email: mockPatient.email });

      // Update the patient profile with missing required fields
      mockReq.user = { id: registeredPatient._id, role: 'users' }; // Invalid role
      mockReq.body = mockPatientUpdate;

      await UserController.updateProfile(mockReq, mockRes);

      // const updatedPatient = await Patient.findOne({ _id: registeredPatient._id });

      expect(mockRes.status).toHaveBeenCalledWith(500);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Invalid role' })
      );
    });

    // Test Case 3 - Update patient profile with invalid user id
    it('Need to fail update due to invalid user id (NEGATIVE)', async () => {
      mockReq.body = mockPatient;

      // Register a new patient
      await UserController.register(mockReq, mockRes);

      // Update the patient profile with invalid user id
      mockReq.user = { id: '1234567890', role: 'user' }; // Invalid user id
      mockReq.body = mockPatientUpdate;

      await UserController.updateProfile(mockReq, mockRes);

      // const updatedPatient = await Patient.findOne({ _id: registeredPatient._id });

      expect(mockRes.status).toHaveBeenCalledWith(500);

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid ID' }));
    });
  });
});
