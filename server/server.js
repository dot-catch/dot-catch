const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const profileController = require('../controllers/profileController.js');
const authController = require('../controllers/authController.js');
// OAuth client and secret credentials
const clientID = '427c8387215135ef63b7';
const clientSecret = '7b79f3ecbbf15addbad9005104242aa42c9ac5e4';

const app = express();
// const port = 3000;
// body Parser used to parse all requests specified to have a JSON body in their header
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// This pushes up the two javascript files used by webpack for the login html and the index.html
app.use('/dist', express.static(path.resolve(__dirname, 'dist/')));

/*
// Flow Test
// app.use((req, res, next) => {
  //   console.log(`
  //   ********* FLOW TEST **********
//   MEDTHOD: ${req.method}
//   URL: ${req.url}
//   BODY: ${JSON.stringify(req.body)}
//   `);
//   return next();
// });
*/

// For supertest file
app.get('/supertest', (req, res) => {
  res.status(201).send({ msg: 'hello test' });
});

// render index.html on initial load
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Need route handler to serve up feedPage
app.get('/loginPage', (req, res) => {
  console.log('from /loginPage');
  // serves up the Login Page
  res.sendFile(path.resolve(__dirname, '../public/loginpage.html'));
});

app.get(
  "/info",
  authController.queryToken,
  authController.checkCookie,
  profileController.addProfile,
  profileController.getAllProfiles,
  (req, res) => {
    const { allProfiles, userGithubProfile } = res.locals;
    res.status(200).send({ allProfiles, userGithubProfile });
  },
);

// handles redirect from GitHub
app.get(
  "/feed",
  authController.getToken,
  authController.addToken,
  (req, res) => {
    return res
      .cookie("authToken", res.locals.session_id, { maxAge: 5000 })
      .redirect("http://localhost:8080/");
  }
);

app.use((err, req, res, next) => {
  // Basic error handler, doesn't really properly handle errors from middleware at this time. TODO.
  console.error(err.stack);
  res.status(404).send(err);
});

// App must not be listening here must be commented out for supertest file to run
// For production or development, import this into another file (e.g. start.js) and listen there
// app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
