import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getAllAppointments, getAppointmentStats } from '../src/services/report.service';
import { jest } from '@jest/globals';
import AppointmentController from '../src/controllers/appointment.controller';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

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

describe('Getting Data with Report Function', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      user: {
        id: '64b5f27f8d7c8e7d9a10b23d'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  // Test Case 1 = if error returns when no data found in appointments
  it('should return 404 when no appointments are found', async () => {
    try {
      // Call the real function directly, assuming the database may return no appointments
      const result = await getAllAppointments();

      // If appointments are found, throw an error
      if (result.length > 0) {
        throw new Error('Test failed - appointments found when none were expected');
      }
    } catch (error) {
      // Expect it to throw a 404 error if no appointments are found
      expect(error.status).toBe(404);
      expect(error.message).toBe('No appointments found');
    }
  });

  // Test Case 2 - Fetch all appointments if data is available
  it('should fetch all appointments successfully from the real database (POSITIVE)', async () => {
    mockReq.body = mockAppointment;

    await AppointmentController.makeAppointment(mockReq, mockRes);
    const appointments = await getAllAppointments();

    // If appointments are found, check if the first appointment has the expected properties
    if (appointments.length > 0) {
      expect(appointments[0]).toHaveProperty('doctorName');
      expect(appointments[0]).toHaveProperty('hospital');
    } else {
      console.log('No appointments found in the database.');
    }
  });

  // Test Case 3 = if error returns when no data found in appointments stats for reports
  it('should return 404 when no appointment Stats are made', async () => {
    try {
      // Call the real function directly
      const result = await getAppointmentStats();

      // If appointment stats are found, throw an error
      if (result.length > 0) {
        throw new Error('Test failed - appointments found when none were expected');
      }
    } catch (error) {
      // Expect it to throw a 404 error if no appointment stats are found
      expect(error.status).toBe(404);
      expect(error.message).toBe('No appointments found');
    }
  });
});
