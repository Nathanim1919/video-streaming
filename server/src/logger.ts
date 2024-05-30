import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Log only info and above
  format: winston.format.json(), // Log in JSON format
  defaultMeta: { service: 'user-service' }, // Default metadata
  transports: [
    // Write all logs error (and below) to `error.log`.
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Write to all logs with level `info` and below to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

logger.add(new winston.transports.Console({
format: winston.format.simple(),
}));

export default logger;