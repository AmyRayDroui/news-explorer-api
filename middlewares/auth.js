require('dotenv').config();
const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-err');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { JWT_SECRET, NODE_ENV, AUTHORIZATION_REQ_ERROR_MESSAGE } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/devConfig');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError(AUTHORIZATION_REQ_ERROR_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new NotAuthorizedError(AUTHORIZATION_REQ_ERROR_MESSAGE);
  }

  req.user = payload;
  next();
};
