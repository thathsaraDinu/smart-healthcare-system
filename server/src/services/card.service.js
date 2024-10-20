import CardRepository from '../repositories/card.repository.js';
import { changePaymentStatus } from './appointment.service.js';

const CardService = {
  // Save card details and complete payment if the card is saved successfully
  async saveCard(cardDetails) {
    try {
      // Attempt to save the card details in the repository
      const savedCard = await CardRepository.save(cardDetails);
      if (savedCard) {
        // If the card is saved successfully, complete the payment
        await this.completePayment(cardDetails.appointmentId);
      }
      return savedCard;
    } catch (error) {
      // Throw an error if saving the card fails
      throw new Error('Failed to save card: ' + error.message);
    }
  },

  // Complete the payment by changing the payment status of the appointment
  async completePayment(appointmentId) {
    try {
      // Change the payment status of the appointment to true (paid)
      return await changePaymentStatus(appointmentId, true);
    } catch (error) {
      // Throw an error if completing the payment fails
      throw new Error('Failed to complete payment: ' + error.message);
    }
  },

  // Retrieve saved cards for a specific user
  async getSavedCards(userId) {
    try {
      // Fetch all saved cards for the given user ID from the repository
      return await CardRepository.findByUserId(userId);
    } catch (error) {
      // Throw an error if retrieving the cards fails
      throw new Error('Failed to retrieve cards: ' + error.message);
    }
  },

  // Delete a card by its ID
  async deleteCard(cardId) {
    try {
      // Delete the card with the given ID from the repository
      return await CardRepository.deleteById(cardId);
    } catch (error) {
      // Throw an error if deleting the card fails
      throw new Error('Failed to delete card: ' + error.message);
    }
  }
};

export default CardService;
