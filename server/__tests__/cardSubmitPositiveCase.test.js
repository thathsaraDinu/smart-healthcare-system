import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import PaymentController from '../src/controllers/payment.controller.js';
import PaymentService from '../src/services/payment.service.js';
import { jest } from '@jest/globals';

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

// Mock data for a valid credit card payment
const validPaymentData = {
  cardNumber: '4111111111111111',
  cardHolder: 'John Doe',
  expirationDate: '12/25',
  cvv: '123',
  amount: 150.0,
  currency: 'USD',
  userId: '64b5f27f8d7c8e7d9a10b23d',
};

describe('Payment Controller Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: validPaymentData,
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  // Positive Test - Payment success
  it('Should successfully process payment with valid card details (POSITIVE)', async () => {
    // Mock the payment service to simulate successful payment
    jest.spyOn(PaymentService, 'processPayment').mockResolvedValue({
      status: 'success',
      message: 'Payment processed successfully',
    });

    await PaymentController.processPayment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        message: 'Payment processed successfully',
      })
    );
  });
});
