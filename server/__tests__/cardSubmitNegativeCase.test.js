// Mock data for invalid credit card payment
const invalidPaymentData = {
  cardNumber: '1234567890123456', // Invalid card number
  cardHolder: 'Jane Doe',
  expirationDate: '01/23',
  cvv: '999',
  amount: 150.0,
  currency: 'USD',
  userId: '64b5f27f8d7c8e7d9a10b23d'
};

// Negative Test - Payment failure due to invalid card details
describe('Payment Controller Tests - Negative Case', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: invalidPaymentData
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  it('Should fail to process payment with invalid card details (NEGATIVE)', async () => {
    // Mock the payment service to simulate failed payment
    jest.spyOn(PaymentService, 'processPayment').mockResolvedValue({
      status: 'failure',
      message: 'Invalid card details'
    });

    await PaymentController.processPayment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400); // Assuming a 400 status for invalid input
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'failure',
        message: 'Invalid card details'
      })
    );
  });
});
