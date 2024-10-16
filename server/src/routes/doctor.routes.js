import { Router } from 'express';
import DoctorController from '../controllers/doctor.controller.js';

const router = Router();

router.get('/', DoctorController.getAllDoctors);
router.put('/:id', DoctorController.updateProfile);

export default router;
