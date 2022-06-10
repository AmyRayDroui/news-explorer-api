const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { limiter } = require('./middlewares/rateLimiter');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router } = require('./routes/index');

const { PORT, DB_ADDRESS } = require('./utils/constants');

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);// adding the request logger

app.use(router);

app.use(errorLogger);// adding the error logger
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
