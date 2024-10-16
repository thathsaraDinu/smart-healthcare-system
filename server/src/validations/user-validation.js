import { z } from 'zod';
import { GENDER, MARITAL_STATUS, USER_ROLES } from '../constants/constants.js';

// Validation schema for user registration
const userValidationSchema = z
  .object({
    fullName: z.string().min(1, 'Name is required'),
    gender: z.string().refine((val) => Object.values(GENDER).includes(val), {
      message: 'Gender Required'
    }),
    mobile: z
      .string()
      .min(1, 'Mobile number is required')
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

// Patient schema
const patientValidationSchema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  maritalStatus: z.string().refine((val) => Object.values(MARITAL_STATUS).includes(val), {
    message: 'Marital status is required'
  }),
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
    .regex(/^\d{10}$/, 'Invalid mobile number')
});

// Doctor schema
const doctorValidationSchema = z.object({
  specialization: z.string().min(1, 'Specialization is required'),
  hospitalDetails: z.array(
    z.object({
      hospital: z.string().min(1, 'Hospital name is required'),
      location: z.string().min(1, 'Location is required'),
      arrivalTimes: z.array(
        z.object({
          dayOfWeek: z
            .string()
            .refine(
              (val) =>
                [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ].includes(val),
              {
                message: 'Day of the week is required'
              }
            ),
          time: z.string().min(1, 'Start time is required')
        })
      ),
      bookingFee: z.number().min(1, 'Booking fee is required')
    })
  )
});

export const createUserValidation = z
  .object({
    role: z.enum(Object.values(USER_ROLES), { message: 'Role is required' }),
    user: userValidationSchema,
    patient: patientValidationSchema.optional(),
    doctor: doctorValidationSchema.optional()
  })
  .refine(
    (data) => {
      if (data.role === USER_ROLES.PATIENT) {
        return data.patient !== undefined;
      }
      if (data.role === USER_ROLES.DOCTOR) {
        return data.doctor !== undefined;
      }
      return true;
    },
    {
      message: 'Patient or doctor details are required based on the selected role.'
    }
  );
