var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('./configs/mongoose');
var log = require('./configs/logger')(module);
var config = require('./configs/config_file');

var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// mongoose.connection.on('open', function () {
    // log.info('connected to database ' + config.get(!process.env.NODE_ENV ? 'db:name' : 'db:test_name'));
// });
    
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/assets/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.use(require('./middleware/sendHttpError'));
// app.use(require('./middleware/loadUser'));

app.use(express.static(path.join(__dirname, 'public')));
// лендинг и регистрации
app.use('/', require('./routes/index.js')(express));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.listen(8080);    
console.log('Magic happens on port 8080'); 




