var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var indexRouter = require('./routes/api');
var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
const port = 9000;

app.post('/*', (req, res)=> {

    console.log('')
    console.log('*********************')
    console.log('POST: ' + req.url )
    console.log('POST: ' + req.url + ' || ', JSON.stringify( req.body,null,2))
  
    try {
  
      req.next()
    } catch(e){
      console.trace(e)
    }
  })
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})