import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import verifyAuth from '../middleware/authorize.js';
import validateRequest from '../middleware/validate.js';
import { USER_ROLES } from '../constants/constants.js';

const router = Router();

// All routes are prefixed with /api/users
// Public routes
// router.post('/', validateRequest('createUser'), UserController.register);
router.post('/', UserController.register);
router.get('/doctors', UserController.getDoctors);

// User only routes
router.get(
  '/profile',
  verifyAuth([USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.MEDICAL_STAFF, USER_ROLES.USER]),
  UserController.profile
);
router.put(
  '/profile',
  verifyAuth([USER_ROLES.ADMIN, USER_ROLES.DOCTOR, USER_ROLES.USER]),
  UserController.updateProfile
);

// Admin only routes
router.get(
  '/users',
  verifyAuth([USER_ROLES.ADMIN, USER_ROLES.MEDICAL_STAFF]),
  UserController.getUsers
);

// Medical Staff only routes
router.get('/:id', verifyAuth([USER_ROLES.MEDICAL_STAFF]), UserController.getProfileById);

export default router;
