import Card from '../models/card.model.js';
import { changePaymentStatus } from './appointment.service.js';

const CardService = {
  // Save card details
  async saveCard(cardDetails) {
    try {
      // Create a new card record in the database
      const card = new Card(cardDetails);
      if (card) {
        this.completePayment(cardDetails.appointmentId);
      }
      const savedCard = await card.save();
      if (savedCard) {
        console.log('Card saved successfully:', savedCard);
      } else {
        console.log('Failed to save card.');
      }
      return savedCard;
    } catch (error) {
      throw new Error('Failed to save card: ' + error.message);
    }
  },

  // Complete payment
  async completePayment(appointmentId) {
    try {
      console.log('Appointment ID:', appointmentId);
      return await changePaymentStatus(appointmentId, true);
    } catch (error) {
      throw new Error('Failed to complete payment: ' + error.message);
    }
  },

  // Get all saved cards for a specific user
  async getSavedCards(userId) {
    try {
      return await Card.find({ userId }).exec();
    } catch (error) {
      throw new Error('Failed to retrieve cards: ' + error.message);
    }
  },

  // Delete a card by ID
  async deleteCard(cardId) {
    try {
      const deletedCard = await Card.findByIdAndDelete(cardId);
      return deletedCard;
    } catch (error) {
      throw new Error('Failed to delete card: ' + error.message);
    }
  }
};

export default CardService;
