import { z } from 'zod';

// Zod validation schema for user login
export const loginUserValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});
