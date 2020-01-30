const db = require("../models/model.js");
const axios = require("axios");
const authController = {};
const clientID = "427c8387215135ef63b7";
const clientSecret = "7b79f3ecbbf15addbad9005104242aa42c9ac5e4";
const fetch = require("node-fetch");

authController.setToken = function(req, res, next) {
  console.log("Greetings from your auth controller");
  const requestToken = req.query.code;
  // Create a post request to send clientID, secret and request token to GitHub
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    // extract access token from response
    res.locals.token = response.data.access_token;
    // stored in local
    // redirects user to the feed passing over the access token
    // res.redirect(`http://localhost:8080/?access_token=${accessToken}`);

    // Response is sent with a cookie (value of true to represent non-expired session) and redirect to /homePage
    next();
  });
};
authController.checkCookie = function(req, res, next) {
  if (req.cookies.authToken !== undefined) {
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + req.cookies.authToken
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log('DATA:', data);
        console.log("access token: ", req.cookies.authToken);
        console.log("initial fetch in /info");
        res.locals.userGithubProfile = data;
        next();
      });
  } else {
    const err = { msg: "invalid session" };
    next(err);
    // change front-end to check against response.err
  }
  // res.send({ msg: 'invalid session' });

  // if session is not valid, redirect to loginPage
  // fetch user data from Github
  // fetch from server API for remaining profiles
  // return response with user data and feed data
};

module.exports = authController;
