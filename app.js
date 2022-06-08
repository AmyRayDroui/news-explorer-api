const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');

const { createUser, login } = require('./controllers/users');

const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/explorerdb');

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
  }),
}), login);

app.use(auth);

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.get('/', () => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
