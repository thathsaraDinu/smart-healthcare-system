import Card from '../models/Card.js';

const CardService = {
  
  // Save card details
  async saveCard(cardDetails) {
    try {
      // Create a new card record in the database
      const card = new Card(cardDetails);
      return await card.save();
    } catch (error) {
      throw new Error('Failed to save card: ' + error.message);
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
};

export default CardService;
