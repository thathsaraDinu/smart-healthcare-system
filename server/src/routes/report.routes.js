import { Router } from 'express';
import {
  getAllAppointmentsController,
  getAppointmentStatsController
} from '../controllers/report.controller.js';

const router = Router();

// Get all appointments
router.get('/', getAllAppointmentsController);

// Get appointment stats
router.get('/stats', getAppointmentStatsController);

export default router;
