const db = require("../models/model.js");
const axios = require("axios");
const authController = {};
const clientID = "6c6c4f2975f185760b3e";
const clientSecret = "d5a6f4ca0eed15eeeb71f22d794d29d26aed7398";
const fetch = require("node-fetch");

authController.getToken = function(req, res, next) {
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
  fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + res.locals.authToken
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log('DATA:', data);
      console.log("access token: ", res.locals.authToken);
      console.log("initial fetch in /info");
      res.locals.userGithubProfile = data;
      next();
    });
  // change front-end to check against response.err

  // res.send({ msg: 'invalid session' });

  // if session is not valid, redirect to loginPage
  // fetch user data from Github
  // fetch from server API for remaining profiles
  // return response with user data and feed data
};
authController.addToken = function(req, res, next) {
  const newAuth = [res.locals.token];
  const insertQuery = {
    name: "auth insert",
    text: "INSERT INTO auth(token) VALUES($1) ",
    values: newAuth
  };
  db.query(insertQuery, (err, auth) => {
    if (err) {
      return next(err);
    }
    const text = "Select id from auth ORDER BY id DESC LIMIT 1";
    const checkQuery = {
      name: "set-token",
      text
    };
    db.query(checkQuery, (err, data) => {
      if (err) {
        console.log("Err, ", err);
        return next(err);
      }
      res.locals.session_id = data.rows[0].id;
      return next();
    });
  });
};
authController.queryToken = function(req, res, next) {
  if (req.cookies.authToken !== undefined) {
    const searchQuery = {
      name: "Find Oauth token",
      text: "Select token from auth where id = $1 Limit 1",

      values: [Number(req.cookies.authToken)]
    };
    db.query(searchQuery, (err, data) => {
      if (err) {
        const error = { msg: "invalid session" };
        return next(error);
      }
      res.locals.authToken = data.rows[0].token;
      next();
    });
  } else {
    const error = { msg: "invalid session" };
    return next(error);
  }
};
module.exports = authController;
