import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/doctor', doctorRoutes);

export default router;
