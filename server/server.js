const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-github2');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const cookieSession = require('cookie-session');

const app = express();

const port = 3000;

app.use((req, res, next) => {
  console.log(`
    ********* FLOW TEST **********
    MEDTHOD: ${req.method}
    URL: ${req.url}
    BODY: ${JSON.stringify(req.body)}
  `);
  return next();
});

// // Passport session setup.
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// configure GitHub passport strategy
passport.use(new Strategy({
  clientID: '427c8387215135ef63b7',
  clientSecret: '7b79f3ecbbf15addbad9005104242aa42c9ac5e4',
  callbackURL: 'http://localhost:8080/feed',
},
(accessToken, refreshToken, profile, cb) => {
  // asynchronous verification, for effect...
  process.nextTick(() => {
    cb(null, profile);
  });
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(methodOverride());

app.use(session({
  secret: 'hot modules in your area',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
// app.use(passport.initialize());
// // persist login sessions
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../public')));

// https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js

app.get('/feed', (req, res) => {
  console.log('made it to OAuth');
});


app.listen(port, () => console.log(`Listening on port ${port}`));

// configure cookieSession
// app.use(cookieSession({
//   // set cookies to expire after one day
//   maxAge: 24 * 60 * 60 * 1000,
// }));

// initialize passport