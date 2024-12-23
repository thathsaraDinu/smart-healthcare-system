import { z } from 'zod';
import { MARITAL_STATUS, GENDER } from '@/constants';

// Zod validation schema
export const userRegisterSchema = z
  .object({
    fullName: z.string().min(1, 'Name is required'),
    dob: z.string().min(1, 'Date of birth is required'),
    maritalStatus: z
      .string()
      .refine(
        (val) =>
          Object.values(MARITAL_STATUS).includes(val),
        {
          message: 'Marital status is required',
        },
      ),
    gender: z
      .string()
      .refine(
        (val) => Object.values(GENDER).includes(val),
        {
          message: 'Gender Required',
        },
      ),
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
        message: 'Invalid mobile number',
      }),
    emergencyContact: z
      .string()
      .min(1, 'Emergency contact is required')
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

// Zod validation schema
export const userUpdateSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  maritalStatus: z
    .string()
    .refine(
      (val) => Object.values(MARITAL_STATUS).includes(val),
      {
        message: 'Marital status is required',
      },
    ),
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
      message: 'Invalid mobile number',
    }),
  emergencyContact: z
    .string()
    .min(1, 'Emergency contact is required')
    .regex(/^\d{10}$/, 'Invalid mobile number'),
});
