let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User.js');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let newsRouter = require('./routes/news');
let hotelRouter = require('./routes/hotels');
let clientRouter = require('./routes/clients');
let orderRouter = require('./routes/orders');

let app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your-secret-key', // Replace with a secure secret key
};
passport.session = () => {};
passport.use(new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
    console.log("We are here");
    console.log(jwtPayload);
    // console.log(done);
    // console.log(User.findById('655012383f2cf4c8c771d736'));

    // Find the user based on the token information
    try {
        let user;
        if(jwtPayload.authType === "password"){
            user = await User.findById(jwtPayload.sub);
            console.log("Password: ", user);
        }
        else if(jwtPayload.authType === "google"){
            user = await User.findOne({ googleID: jwtPayload.sub});
            console.log("Google: ", user);
        }
        else if(jwtPayload.authType === "facebook"){
            user = await User.findOne({ facebookID: jwtPayload.sub});
            console.log("Facebook: ", user);
        }

        if (user) {
            // User found, authentication successful
            // console.log("------GoogleID------");
            // console.log(user);
            return done(null, user);
        } else {
            // User not found, authentication unsuccessful
            return done(null, false);
        }

    } catch (err) {
        // Error occurred during database query
        console.log("------ErrorGoogleID------", err);

        return done(err, false);
    }

    // Test with a known user ID
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/news', newsRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/client', clientRouter);
app.use('/api/order', orderRouter);

// Serve static files from the 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));

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
