import { Router } from 'express';
import loginLimiter from '../middleware/login-limiter.js';
import { loginUser, refreshAccessToken, logoutUser } from '../controllers/auth.controller.js';
import validateRequest from '../middleware/validate.js';

const router = Router();

// All routes are prefixed with /api/auth
// Public routes
router.post('/', loginLimiter, validateRequest('loginUser'), loginUser);

// Protected routes
router.get('/', refreshAccessToken);
router.post('/logout', logoutUser);

// Admin only route

export default router;
