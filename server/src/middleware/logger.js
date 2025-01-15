import pino from 'pino';
import pinoHttp from 'pino-http';
import { LOGGER_CONFIG } from '../constants/constants.js';

// Determine the environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Define the transport only for development
const transport = isDevelopment
  ? pino.transport({
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            levelFirst: true,
            messageFormat: true,
            crlf: false,
            errorProps: '*',
            colorizeObjects: true,
            singleLine: true,
          },
        },
      ],
    })
  : undefined; // No transport for production

const logger = pino(
  {
    level: LOGGER_CONFIG.level,
  },
  transport // Use transport only in development
);

const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (err || res.statusCode >= 500) {
      return 'error';
    } else if (res.statusCode >= 400) {
      return 'warn';
    } else {
      return 'info';
    }
  },
  serializers: {
    req: (req) => ({
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: (err) => ({
      type: err.type,
      message: err.message,
      stack: err.stack,
    }),
  },
});

export { httpLogger };
