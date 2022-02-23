var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const { stack } = require('./routes/index');
var db = require('./db')

db.connect(db.MODE_PRODUCTION)
  .then((response) => {
    console.log(response)
  }).catch((err) => {
    console.log("********************")
    console.log("Something went wrong with your connection to the MySQL server.")
    console.log("Here are the most likely reasons:")
    console.log("- You didn't set up a user named apiUser with the password !apisAreFun in Workbench")
    console.log("- You somehow changed the user name: apiUser or password:!apisAreFun in the db.js file")
    console.log("********************")
    console.log('Here is the error message that MySQL gave us', err)
    process.exit(1)
  })



var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("Error:", err.message)
  console.log("StackTrace", err, stack)
  res.send("An error occurred, please check the console in the back end app")
  res.end
});

module.exports = app;
