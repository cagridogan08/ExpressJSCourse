var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {errorHandler} = require("./middlewares/Error/customErrorHandler");
var {connectDatabase} = require("./helpers/database/connectDatabase");
const dotenv = require("dotenv");
var mainRouter = require("./routes/mainRouter");
var appPORT=3000;
dotenv.config({
  path:"./config/env/config.env"
});
//
var app = express();
app.listen(appPORT,() => {
  console.log("Server Started on PORT:",appPORT);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//static files
app.use(express.static(path.join(__dirname, 'public')));
connectDatabase();
/// defining main rotuer
app.use('/api',mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(errorHandler);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
