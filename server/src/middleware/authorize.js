import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../constants/constants.js';

const verifyAuth = (requiredRoles = []) => {
  return (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if token exists
    if (!authHeader?.startsWith('Bearer')) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, JWT_CONFIG.accessTokenSecret, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const userRoles = decoded.UserInfo.role;

      // Check if user has required roles
      if (!requiredRoles.length || requiredRoles.some((role) => [userRoles].includes(role))) {
        req.user = decoded.UserInfo;
        next();
      } else {
        res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
    });
  };
};

export default verifyAuth;
