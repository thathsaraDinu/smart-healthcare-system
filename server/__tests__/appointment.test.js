import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import AppointmentController from '../src/controllers//appointment.controller.js';
import Appointment from '../src/models/appointment.model.js';
import { jest } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Appointment.deleteMany(); // Clear the collection after each test
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Mock Data for testing
// This data will be used to create a new Appointment
const mockAppointment = {
  user: '64b5f27f8d7c8e7d9a10b23d',
  appointmentNumber: 1,
  patientName: 'John Doe',
  email: 'johndoe@example.com',
  phoneNumber: '+1-555-123-4567',
  area: 'Downtown',
  nic: '987654321V',
  schedule: {
    doctor: {
      fullName: 'Dr. Sarah Johnson',
      gender: 'Female',
      specialization: 'Cardiologist'
    },
    hospital: 'City General Hospital',
    location: '123 Main St, Springfield',
    bookingFee: 150.0,
    date: '2024-10-20',
    time: '10:30 AM'
  }
};

const mockAppointmentMissed = {
  user: '64b5f27f8d7c8e7d9a10b23d',
  appointmentNumber: 1,
  patientName: 'John Doe',
  email: 'johndoe@example.com',
  phoneNumber: '+1-555-123-4567',
  area: 'Downtown',
  // nic: '987654321V', nic missed
  schedule: {
    doctor: {
      fullName: 'Dr. Sarah Johnson',
      gender: 'Female',
      specialization: 'Cardiologist'
    },
    hospital: 'City General Hospital',
    location: '123 Main St, Springfield',
    bookingFee: 150.0,
    date: '2024-10-20',
    time: '10:30 AM'
  }
};

// This data will be used to update the Appointment
const mockPatientUpdate = {
  user: '64b5f27f8d7c8e7d9a10b23d',
  appointmentNumber: 1,
  patientName: 'Nadeesh',
  email: 'Nadeesh@mail.com',
  phoneNumber: '+1-555-123-4567',
  area: 'Downtown',
  nic: '987654321V',
  schedule: {
    doctor: {
      fullName: 'Dr. Sarah Johnson',
      gender: 'Female',
      specialization: 'Cardiologist'
    },
    hospital: 'City General Hospital',
    location: '123 Main St, Springfield',
    bookingFee: 150.0,
    date: '2024-10-20',
    time: '10:30 AM'
  }
};

// Unit Tests - User Registration
describe('Appointment based Unit Tests', () => {
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

  // Test Suite - ake an Appointment Tests
  describe('Make an Appointment Tests', () => {
    // Test Case 1 - ake an Appointment with all required fields
    it('Need to make an appointment successfully (POSITIVE)', async () => {
      mockReq.body = mockAppointment;

      await AppointmentController.makeAppointment(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Appointment successful' })
      );
    });

    // Test Case 2 - Register a new patient with missing required fields
    it('Need to fail appointment due to validation error (NEGATIVE)', async () => {
      mockReq.body = mockAppointmentMissed;

      await AppointmentController.makeAppointment(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Validation failed' })
      );
    });
  });

  // Test Suite - Appointment Update Tests
  describe('Appointment Update Tests', () => {
    // Test Case 1 - Update Appointment with all required fields
    it('Need to update appointment successfully (POSITIVE)', async () => {
      mockReq.body = mockAppointment;

      // Register a new appointment
      await AppointmentController.makeAppointment(mockReq, mockRes);

      // Extract appointment _id
      const appointment = await Appointment.findOne({ email: mockAppointment.email });

      await AppointmentController.updateProfile(mockReq, mockRes);

      const updatedAppointment = await Appointment.findOne({ email: mockPatientUpdate.email });

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });
});
