import { z } from 'zod';
import { USER_ROLES } from '../constants/constants.js';

// Validation schema for user registration
export const createUserValidation = z.object({
  fullName: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(Object.values(USER_ROLES)),
  gender: z.enum(['male', 'female'])
});
