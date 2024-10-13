import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserSchema from '../models/user.model.js';
import { JWT_CONFIG } from '../constants/constants.js';

// Login user (Create and return access token and refresh token)
const userLogin = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  // Check if user exists
  const user = await UserSchema.findOne({ email }).exec();

  // Check if user exists
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  // Create access token
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        role: user.role
      }
    },
    JWT_CONFIG.accessTokenSecret,
    { expiresIn: JWT_CONFIG.accessTokenExpiry }
  );

  // Create refresh token
  const refreshToken = jwt.sign({ id: user._id }, JWT_CONFIG.refreshTokenSecret, {
    expiresIn: JWT_CONFIG.refreshTokenExpiry
  });

  return { accessToken, refreshToken };
};

// Verify refresh token and return new access token
const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, JWT_CONFIG.refreshTokenSecret, async (err, decoded) => {
      if (err) return reject(new Error('Unauthorized'));

      // Check if user exists in db
      const user = await UserSchema.findOne({ _id: decoded.id }).exec();

      if (!user) return reject(new Error('Unauthorized'));

      // Create new access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: user._id,
            role: user.role
          }
        },
        JWT_CONFIG.accessTokenSecret,
        { expiresIn: JWT_CONFIG.accessTokenExpiry }
      );

      // Return new access token
      resolve(accessToken);
    });
  });
};

// Clear refresh token
const clearRefreshToken = () => {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 0
  };
};

export { userLogin, verifyRefreshToken, clearRefreshToken };
