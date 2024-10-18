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

describe('User based Unit Tests', () => {
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

  describe('Patient Register Tests', () => {
    it('Need to register patient successfully', async () => {
      mockReq.body = mockPatient;

      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Registration successful' })
      );
    });
  });
});
