import { Router } from 'express';
import DoctorController from '../controllers/doctor.controller.js';

const router = Router();

router.get('/schedules/:id', DoctorController.getChannelSchedules);

export default router;
