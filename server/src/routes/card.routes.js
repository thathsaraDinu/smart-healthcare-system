import express from 'express';
import { CardController } from '../controllers/card.controller.js';

const router = express.Router();

// Route to save card details
router.post('/cards', CardController.saveCard);

// Route to get saved cards by user ID
router.get('/cards/:userId', CardController.getSavedCards);

// Route to delete a card by card ID
router.delete('/cards/:cardId', CardController.deleteCard);

export default router;
