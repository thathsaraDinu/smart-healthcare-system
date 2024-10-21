import mongoose from 'mongoose';

// Define the schema for the Card model
export const cardSchema = new mongoose.Schema(
  {
    // Reference to the user who owns the card
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    // Name of the card (e.g., Visa, MasterCard)
    cardname: {
      type: String,
      required: true,
      trim: true
    },
    // Name of the cardholder
    cardholderName: {
      type: String,
      required: true,
      trim: true
    },
    // Card number
    cardNumber: {
      type: String,
      required: true,
      trim: true
    },
    // Expiry date of the card
    expiry: {
      type: String,
      required: true
    },
    // CVV code of the card
    cvv: {
      type: String,
      required: true
    }
  },
  // Automatically include createdAt and updatedAt timestamps
  { timestamps: true }
);

// Export the Card model based on the cardSchema
export default mongoose.model('Card', cardSchema);
