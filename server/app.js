const PORT = 9000;

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.post('/*', (req, res) => {
  console.log('\n*********************');
  console.log('POST: ' + req.url);
  console.log('POST: ' + req.url + ' || ', JSON.stringify(req.body, null, 2));
  try {
    req.next();
  } catch(err) {
    console.trace(err);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
