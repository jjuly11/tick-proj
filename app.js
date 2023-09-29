require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport= require('passport');
const User = require('./models/userModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose= require('mongoose');
// Sessions
const session = require('express-session');
const MongoStore = require('connect-mongo');


// For Flash Messages
const flash= require('connect-flash');

var app = express();

// Sessions start
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
  // saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB,
  })
}));
// Session End

// Configure passport start
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Configure passport end

// For Flash Message
app.use(flash());

// Custom middleware Start
app.use( (req,res,next) => {
  res.locals.user = req.user;
  // console.log('req.user');
  res.locals.url = req.path;
  res.locals.flash = req.flash(),
  next();
} );
// Custom middleware end

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use((req,res,next) =>{
  res.locals.url = req.path;
  next();
});

// Config Mongo DB
mongoose.connect(process.env.DB);
mongoose.Promise= global.Promise;
mongoose.connection.on('error', (error) => console.error(error.message));


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
