import { Router } from 'express';
import {
  getAllAppointmentsController,
  getAppointmentStatsController
} from '../controllers/report.controller.js';
import verifyAuth from '../middleware/authorize.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// Get all appointments
router.get('/', getAllAppointmentsController);

// Get appointment stats
router.get(
  '/stats',
  verifyAuth([USER_ROLES.ADMIN]),
  getAppointmentStatsController
);

export default router;
