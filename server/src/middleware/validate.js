import { ZodError } from 'zod';
import { schemas } from '../validations/validations.js';

export default function validateRequest(schemaName) {
  return (req, res, next) => {
    try {
      // Get the schema from the registry
      const schema = schemas[schemaName];

      // Validate request data against the schema
      schema.parse(req.body);
      next(); // If validation succeeds, pass control to the next middleware or route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors
        });
      }
      // Handle other errors
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  };
}
