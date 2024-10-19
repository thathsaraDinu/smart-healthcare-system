import CardService from '../services/card.service.js';

// Controller to handle card-related operations
export const CardController = {
  // Save a new card
  async saveCard(req, res) {
    try {
      const { userId, cardholderName, cardNumber, expiry, cvv, appointmentId } = req.body;

      if (!userId || !cardholderName || !cardNumber || !expiry || !cvv) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Call the service to save the card details
      const savedCard = await CardService.saveCard({
        userId,
        cardholderName,
        cardNumber,
        expiry,
        cvv,
        appointmentId
      });

      return res.status(201).json({ message: 'Card saved successfully', card: savedCard });
    } catch (error) {
      console.error('Error saving card:', error);
      return res.status(500).json({ error: 'An error occurred while saving the card' });
    }
  },

  // Get saved cards for a user
  async getSavedCards(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const cards = await CardService.getSavedCards(userId);

      return res.status(200).json({ cards });
    } catch (error) {
      console.error('Error retrieving cards:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving cards' });
    }
  }
};
