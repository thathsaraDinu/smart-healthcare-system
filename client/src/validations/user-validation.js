import { z } from 'zod';

// Zod validation schema
export const userRegisterSchema = z
  .object({
    fullName: z.string().min(1, 'Name required'),
    dob: z.string().min(1, 'Date of birth required'),
    maritalStatus: z.enum([
      'single',
      'married',
      'divorced',
      'widowed',
    ]),
    gender: z.enum(['male', 'female']),
    mobile: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    email: z.string().email('Invalid email address'),
    physicianName: z
      .string()
      .min(1, 'Physician name required'),
    physicianMobile: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    emergencyContact: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export const createUserValidation = z
  .object({
    fullName: z.string().min(1, 'Name required'),
    // email: z.string().email('Invalid email address'),
    mobile: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['user']),
    // gender: z.enum(['male', 'female']),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});
