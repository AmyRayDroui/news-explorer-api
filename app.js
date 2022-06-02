const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
