const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/explorerdb');

app.use(helmet());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.get('/', () => {
  //throw new NotFoundError('Requested resource not found');
});

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
