import { z } from 'zod';
import { GENDER, MARITAL_STATUS } from '../constants/constants.js';

// Validation schema for user registration
export const createUserValidation = z
  .object({
    fullName: z.string().min(1, 'Name is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    maritalStatus: z.string().refine((val) => Object.values(MARITAL_STATUS).includes(val), {
      message: 'Marital status is required'
    }),
    gender: z.string().refine((val) => Object.values(GENDER).includes(val), {
      message: 'Gender Required'
    }),
    mobile: z
      .string()
      .min(1, 'Mobile number is required')
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    email: z.string().email('Invalid email address'),
    physicianName: z.string().optional(),
    physicianMobile: z
      .string()
      .optional()
      .refine((value) => !value || /^\d{10}$/.test(value), {
        message: 'Invalid mobile number'
      }),
    emergencyContact: z
      .string()
      .min(1, 'Emergency contact is required')
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });
