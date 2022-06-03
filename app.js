const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRoute = require('./Routes/users');
const articlesRoute = require('./Routes/articles');


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


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
