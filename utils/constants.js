require('dotenv').config();
const { JWT_SECRET_DEV, DB_ADDRESS_DEV, NODE_ENV_DEV } = require('./devConfig');

const {
  PORT = 3000,
  NODE_ENV = NODE_ENV_DEV,
  DB_ADDRESS = DB_ADDRESS_DEV,
  JWT_SECRET = JWT_SECRET_DEV,
} = process.env;

// error codes
const INVALID_DATA_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

// generic error messages
const SERVER_ERROR_MESSAGE = 'Server Error';
const NOT_FOUND_RESOURCES = 'Requested resource not found';
const AUTHORIZATION_REQ_ERROR_MESSAGE = 'Authorization Required';

// user error messages
const INVALID_USER_DATA_ERROR_MESSAGE = 'wrong data';
const INVALID_DATA_PASSED_USER_ERROR_MESSAGE = 'invalid data passed to the methods for creating a user';
const EMAIL_EXISTS_ERROR_MESSAGE = 'This email is already registered in the program';

// article error messages
const INVALID_DATA_ARTICLE_ERROR_MESSAGE = 'invalid data passed to the methods for creating a article';
const INVALID_ARTICLE_ERROR_MESSAGE = 'invalid Article';
const ARTICLE_NOT_FOUND_ERROR_MESSAGE = 'Article not found';
const NOT_AUTHORIZED_ARTICLE_ERROR_MESSAGE = 'Not the owner of the Article';

// log file names
const REQUEST_LOGGER_FILE = 'request.log';
const ERROR_LOGGER_FILE = 'error.log';

module.exports = {
  PORT,
  NODE_ENV,
  DB_ADDRESS,
  JWT_SECRET,
  INVALID_DATA_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_RESOURCES,
  AUTHORIZATION_REQ_ERROR_MESSAGE,
  INVALID_USER_DATA_ERROR_MESSAGE,
  INVALID_DATA_PASSED_USER_ERROR_MESSAGE,
  EMAIL_EXISTS_ERROR_MESSAGE,
  INVALID_DATA_ARTICLE_ERROR_MESSAGE,
  INVALID_ARTICLE_ERROR_MESSAGE,
  ARTICLE_NOT_FOUND_ERROR_MESSAGE,
  NOT_AUTHORIZED_ARTICLE_ERROR_MESSAGE,
  REQUEST_LOGGER_FILE,
  ERROR_LOGGER_FILE,
};
