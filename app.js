var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const bodyParser = require("body-parser"); //for extracting post data

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getfileRouter = require('./routes/getfile');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var paginatedRouter = require('./routes/paginatedItems');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
//app.use(bodyParser.urlencoded({ extended: false }));
/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
//app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//will be executed for all request
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

//will be executed only for /users
app.use('/users', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Type of Request: ', req.method)
  next()
})

//will be executed only for /register
app.use('/register', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Type of Request: ', req.method)
  next()
})

app.use('/paginatedItems', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
})

app.use('/', indexRouter);

//adding middleware--practice and will be logged for /user and /getfile and not for / bcz middleware is defined after /
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger);

app.use('/users', usersRouter);
app.use('/getfile', getfileRouter);


app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/paginatedItems',paginatedRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
