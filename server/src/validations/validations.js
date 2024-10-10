import { loginUserValidation } from './auth-validation.js';
import { createUserValidation } from './user-validation.js';

export const schemas = {
  // User Validation Schema
  createUser: createUserValidation,

  // Auth Validation Schema
  loginUser: loginUserValidation
};
