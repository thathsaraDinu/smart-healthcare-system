// Server configuration constants
export const SERVER_PORT = process.env.SERVER_PORT || 3001;

// Database configuration constants
export const DATABASE_CONFIG = {
  dbName: process.env.DB_NAME,
  uri: process.env.MONGODB_URI
};

// JWT configuration constants
export const JWT_CONFIG = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY
};

// Logger configuration constants
export const LOGGER_CONFIG = {
  level: process.env.LOG_LEVEL || 'info'
};

// Role configuration constants
export const USER_ROLES = {
  USER: 'user',
  DOCTOR: 'doctor',
  MEDICAL_STAFF: 'medical_staff',
  ADMIN: 'admin'
};

// Gender enums
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female'
};

// Marital Status enums
export const MARITAL_STATUS = {
  SINGLE: 'single',
  MARRIED: 'married',
  DIVORCED: 'divorced',
  WIDOWED: 'widowed'
};

// Account Status enums
export const ACCOUNT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};
