require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const InvalidDataError = require('../errors/invalid-data-err');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { JWT_SECRET } = process.env;

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new InvalidDataError('wrong data'));
    }
    next(new Error('Server Error'));
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
      next(new InvalidDataError('invalid data passed to the methods for creating a user'));
    } if (err.name === 'MongoServerError') {
      next(new InvalidDataError('This email is already registered in the program'));
    } else {
      next(new Error('Server Error'));
    }
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new NotAuthorizedError(err.message));
    });
};
