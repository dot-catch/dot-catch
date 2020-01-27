const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const apiRouter = require('../routers/apiRouter.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/dist', express.static(path.resolve(__dirname, 'dist/')));

// Flow Test
app.use((req, res, next) => {
  console.log(`
  ********* FLOW TEST **********
  MEDTHOD: ${req.method}
  URL: ${req.url}
  BODY: ${JSON.stringify(req.body)}
  `);
  return next();
});

// render index.html on initial load
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/index.html'));
// });

// OAuth client and secret credentials
const clientID = '427c8387215135ef63b7';
const clientSecret = '7b79f3ecbbf15addbad9005104242aa42c9ac5e4';

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
    // redirects user to the feed passing over the access token
    res.redirect(`/test?access_token=${accessToken}`);
  });
});

// redirect route for /feed
app.get('/test', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/feed.html'));
});

app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).send('Abort! Error!')
});

app.listen(port, () => console.log(`Listening on port ${port}`));
