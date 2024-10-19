import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';
import appointmentRoutes from './appointment.routes.js';
import reportRoutes from './report.routes.js'

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/doctor', doctorRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/report', reportRoutes);

export default router;
