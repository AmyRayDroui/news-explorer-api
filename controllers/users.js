require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const InvalidDataError = require('../errors/invalid-data-err');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { JWT_SECRET, NODE_ENV } = require('../utils/constants');
const {
  INVALID_USER_DATA_ERROR_MESSAGE, INVALID_DATA_PASSED_USER_ERROR_MESSAGE,
  EMAIL_EXISTS_ERROR_MESSAGE, SERVER_ERROR_MESSAGE,
} = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/devConfig');

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new InvalidDataError(INVALID_USER_DATA_ERROR_MESSAGE));
    }
    next(new Error(SERVER_ERROR_MESSAGE));
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    res.send(user);
  } catch (err) {
    if (err.name === 'TypeError') {
      next(new InvalidDataError(INVALID_DATA_PASSED_USER_ERROR_MESSAGE));
    } if (err.name === 'MongoServerError') {
      next(new InvalidDataError(EMAIL_EXISTS_ERROR_MESSAGE));
    } else {
      next(new Error(SERVER_ERROR_MESSAGE));
    }
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new NotAuthorizedError(err.message));
    });
};
