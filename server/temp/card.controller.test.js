import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';
import CardController from '../src/controllers/card.controller.js';
import CardService from '../src/services/card.service.js';
import Card from '../src/models/card.model.js';

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

// Mock Data for testing
const mockCard = {
  userId: '64b5f27f8d7c8e7d9a10b23d',
  cardname: 'Visa',
  cardholderName: 'John Doe',
  cardNumber: '4111111111111111',
  expiry: '12/25',
  cvv: '123'
};

describe('Card Controller Tests', () => {
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

  // Test case: Save card successfully
  it('Should save a card successfully (POSITIVE)', async () => {
    mockReq.body = mockCard;

    // Mock CardService saveCard function
    jest.spyOn(CardService, 'saveCard').mockResolvedValue(mockCard);

    await CardController.saveCard(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Card saved successfully',
      card: mockCard
    });
  });

  // Test case: Fail to save card due to validation error
  it('Should fail to save card if fields are missing (NEGATIVE)', async () => {
    mockReq.body = {}; // Missing required fields

    await CardController.saveCard(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'All fields are required'
    });
  });

  // Test case: Retrieve saved cards successfully
  it('Should retrieve saved cards successfully (POSITIVE)', async () => {
    mockReq.params.userId = mockCard.userId;

    // Mock CardService getSavedCards function
    jest.spyOn(CardService, 'getSavedCards').mockResolvedValue([mockCard]);

    await CardController.getSavedCards(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      cards: [mockCard]
    });
  });

  // Test case: Fail to retrieve cards if userId is missing
  it('Should fail to retrieve cards if userId is not provided (NEGATIVE)', async () => {
    await CardController.getSavedCards(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'User ID is required'
    });
  });

  // Test case: Delete card successfully
  it('Should delete card successfully (POSITIVE)', async () => {
    mockReq.params.cardId = 'someCardId';

    // Mock CardService deleteCard function
    jest.spyOn(CardService, 'deleteCard').mockResolvedValue(true);

    await CardController.deleteCard(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Card deleted successfully'
    });
  });

  // Test case: Fail to delete card if cardId is missing
  it('Should fail to delete card if cardId is not provided (NEGATIVE)', async () => {
    await CardController.deleteCard(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Card ID is required'
    });
  });
});
