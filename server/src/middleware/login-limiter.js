import { rateLimit } from 'express-rate-limit';
import { httpLogger } from '../middleware/logger.js';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
  message: { message: 'Too many login attempts, please try again later.' },
  skip: (req, res) => {
    // Skip rate limiting for requests that do not have an email in the body
    if (req.body && req.body.email) {
      // If email is present, do not skip rate limiting
      return false;
    }
    // If email is not present, skip rate limiting
    return true;
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

export default loginLimiter;
