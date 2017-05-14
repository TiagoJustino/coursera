//Express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'MzPM5COLyznNOUb1-sNPzOhClBECUS6QM-9smHOhtHSBJS40M5-7QXYJYWXNQgKRTSR',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes ======================================================================
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(3000);
