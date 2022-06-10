const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const usersRoute = require('./users');
const articlesRoute = require('./articles');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  }),
}), login);

router.use(auth);

router.use('/users', usersRoute);
router.use('/articles', articlesRoute);
router.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

module.exports = { router };
