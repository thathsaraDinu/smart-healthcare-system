import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import verifyAuth from '../middleware/authorize.js';
import validateRequest from '../middleware/validate.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// All routes are prefixed with /api/users
// Public routes
router.post('/', validateRequest('createUser'), UserController.register);

// User only routes
router.get(
  '/profile',
  verifyAuth([USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER]),
  UserController.profile
);

// Admin only routes
router.get('/users', verifyAuth([USER_ROLES.SUPER_ADMIN]), UserController.getUsers);

export default router;
