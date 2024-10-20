import Card from '../models/card.model.js';

// Repository class for handling card-related database operations
class CardRepository {
    // Save a new card to the database
    async save(cardDetails) {
        const card = new Card(cardDetails);
        return await card.save();
    }

    // Find cards by user ID
    async findByUserId(userId) {
        return await Card.find({ userId }).exec();
    }

    // Delete a card by its ID
    async deleteById(cardId) {
        return await Card.findByIdAndDelete(cardId);
    }
}

// Export an instance of the CardRepository
export default new CardRepository();
