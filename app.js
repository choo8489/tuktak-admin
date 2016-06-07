var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

var index = require('./routes/index');
var adminMiddleware = require('./routes/adminMiddleware');
var communities = require('./routes/communities');
var sites = require('./routes/sites');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/node_modules',  express.static(__dirname + '/node_modules'));

var API_HOST = process.env.API_HOST || 'http://localhost:8900';
//
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', proxy({target: API_HOST}));

//app.use('/v1', proxy({
//  target: API_HOST,
//  pathRewrite:{
//    '^/v1':'/v1'
//  }
//}));

//app.use('/', index);
//app.use('*', adminMiddleware);
app.use('/sites', sites);
app.use('/communities', communities);

app.post('/test',function(req, res) {
  res.send('Ok');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
