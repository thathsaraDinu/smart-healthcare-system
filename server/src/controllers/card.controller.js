// controllers/card.controller.js
import CardService from '../services/card.service.js';
import { validateCard } from '../validations/card.validator.js';


// Controller for handling card-related operations
export const CardController = {
  // Method to save a card
  async saveCard(req, res) {
    try {
      // Validate incoming card data
      validateCard(req.body);
      // Save the card using the CardService
      const savedCard = await CardService.saveCard(req.body);
      // Respond with success message and saved card data
      return res.status(201).json({ message: 'Card saved successfully', card: savedCard });
    } catch (error) {
      // Log and respond with error message
      console.error('Error saving card:', error);
      return res.status(400).json({ error: error.message });
    }
  },


  // Method to get saved cards for a specific user
  async getSavedCards(req, res) {
    try {
      const { userId } = req.params;
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      // Retrieve saved cards using the CardService
      const cards = await CardService.getSavedCards(userId);
      // Respond with retrieved cards
      return res.status(200).json({ cards });
    } catch (error) {
      // Log and respond with error message
      console.error('Error retrieving cards:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving cards' });
    }
  },

  
  // Method to delete a card
  async deleteCard(req, res) {
    try {
      const { cardId } = req.params;
      // Check if cardId is provided
      if (!cardId) {
        return res.status(400).json({ error: 'Card ID is required' });
      }
      // Delete the card using the CardService
      const deletedCard = await CardService.deleteCard(cardId);
      // Respond with appropriate message based on deletion result
      if (deletedCard) {
        return res.status(200).json({ message: 'Card deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Card not found' });
      }
    } catch (error) {
      // Log and respond with error message
      console.error('Error deleting card:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the card' });
    }
  }
};
