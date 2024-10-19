import express from 'express';
import { CardController } from '../controllers/card.controller.js';

const router = express.Router();

// Route to save card details
router.post('/cards', CardController.saveCard);

// Route to get saved cards by user ID
router.get('/cards/:userId', CardController.getSavedCards);

export default router;
