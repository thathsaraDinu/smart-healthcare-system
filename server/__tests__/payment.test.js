import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CardController } from '../src/controllers/card.controller.js';
import Card from '../src/models/card.model.js';
import { jest } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Card.deleteMany(); // Clear the collection after each test
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Mock Data for testing
// This data will be used to save card
const mockCard = {
  user: '64b5f27f8d7c8e7d9a10b23d',
  userId: '64b5f27f8d7c8e7d9a10b23d',
  cardholderName: 'John Doe',
  cardNumber: '1234567890123456',
  expiry: '10/24',
  cvv: '123',
  cardname: 'Visa'
};

const missedMockCard = {
  user: '64b5f27f8d7c8e7d9a10b23d',
  userId: '64b5f27f8d7c8e7d9a10b23d',
  cardholderName: 'John Doe',
  cardNumber: '1234567890123456',
  expiry: '10/24',
  cvv: '123'
  // cardname: 'Visa' // Missed cardname
};

// This data will be used to update the Appointment
const mockAppoinmentUpdate = {
  // user: '64b5f27f8d7c8e7d9a10b23d',
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

  // Test Suite - Save card test Tests
  describe('Save card test Tests', () => {
    // Test Case 1 - Need to save card successfully
    it('Need to save card details successfully (POSITIVE)', async () => {
      mockReq.body = mockCard;

      await CardController.saveCard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    // Test Case 2 - Need to save card with missing cardholderName
    it('Need to fail save card details with missing props (NEGATIVE)', async () => {
      mockReq.body = missedMockCard;

      await CardController.saveCard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    // Test Case 3 - Need to fail save card with missing cardNumber
    it('Need to fail save card details with missing props (NEGATIVE)', async () => {
      mockReq.params.cardId = '64b5f27f8d7c8e7d9a10b23d';

      await CardController.deleteCard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});
