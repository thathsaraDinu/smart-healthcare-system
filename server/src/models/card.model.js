import mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cardname: {
      type: String,
      required: true,
      trim: true
    },
    cardholderName: {
      type: String,
      required: true,
      trim: true
    },
    cardNumber: {
      type: String,
      required: true,
      trim: true
    },
    expiry: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    cardholderName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Card', cardSchema);
