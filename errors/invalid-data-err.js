const { INVALID_DATA_CODE } = require('../utils/constants');

class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_DATA_CODE;
  }
}

module.exports = InvalidDataError;
