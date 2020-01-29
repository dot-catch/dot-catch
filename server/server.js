const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');
const apiRouter = require('../routers/apiRouter.js');
const profileController = require('../controllers/profileController.js')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let authToken;

// app.use('/dist', express.static(path.resolve(__dirname, 'dist/')));

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

// render index.html on initial load
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// OAuth client and secret credentials
const clientID = '427c8387215135ef63b7';
const clientSecret = '7b79f3ecbbf15addbad9005104242aa42c9ac5e4';

// Need route handler to serve up feedPage
app.get('/loginPage', (req, res) => {
  console.log('from /loginPage');
  // serves up homepage.html
  res.sendFile(path.resolve(__dirname, '../public/loginpage.html'));
  // res.send('Hello');
})

app.get('/info', (req, res, next) => {
  console.log('hello from /info');
  // res.redirect('/loginPage');
  
  /****************/
  // check if session is valid (by checking cookie)
  // res.send({ msg: 'invalid session' });

  // if session is not valid, redirect to loginPage
  // fetch user data from Github
  // fetch from server API for remaining profiles
  fetch('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + authToken,
      }
    })
    .then(response => response.json())
    .then(data => {
      // console.log('DATA:', data);
      console.log('access token: ', authToken);
      console.log('initial fetch in /info');
      res.locals.userGithubProfile = data;
      next()
    })
  // return response with user data and feed data
}, profileController.addProfile, profileController.getAllProfiles, (req, res) => {
  console.log('final anonymous middleware callback');
  const { allProfiles, userGithubProfile } = res.locals;
  res.status(200).send({ allProfiles, userGithubProfile });
})

// handles redirect from GitHub
app.get('/feed', (req, res) => {
  // grabs request token sent by GitHub
  const requestToken = req.query.code;
  // Create a post request to send clientID, secret and request token to GitHub
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => {
    // extract access token from response
    const accessToken = response.data.access_token;
    authToken = response.data.access_token; // stored in local
    // redirects user to the feed passing over the access token
    // res.redirect(`http://localhost:8080/?access_token=${accessToken}`);

    // Response is sent with a cookie (value of true to represent non-expired session) and redirect to /homePage
    res.cookie('isLoggedIn', 'true', { maxAge: 5000 }).redirect('http://localhost:8080/');
  });
});

app.use('/api', apiRouter);  

app.use(function (err, req, res, next) { //Basic error handler, doesn't really properly handle errors from middleware at this time. TODO.
  console.error(err.stack)
  res.status(404).send('Abort! Error!')
});

app.listen(port, () => console.log(`Listening on port ${port}`));
