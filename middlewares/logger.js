const winston = require('winston');
const expressWinston = require('express-winston');
const { REQUEST_LOGGER_FILE, ERROR_LOGGER_FILE } = require('../utils/constants');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUEST_LOGGER_FILE }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR_LOGGER_FILE }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
