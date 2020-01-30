/*

Back-end testing file

Endpoints to test: expected response
==> should also test failures

Unit Tests:
'/': index.html, status code 200(?), content type html
'/loginPage': loginpage.html, status code 200(?), content type html
'/info': makes a fetch to Github with valid authtoken in cookie
'/feed': when given a valid request token in the query string, gets an auth token and responds with it as a cookie

profileController.addProfile: 
  -adds a user to the database if they are new
  -does not add a user to the database if they are not new

profileController.getAllProfiles:
  -gets all profiles from the database that are not the users

Integration Tests:
'/info': returns user profile and feed info with valid authtoken from req.cookies

Database Create Table Script:
  CREATE TABlE "profiles" (
  "id" SERIAL NOT NULL,
  "login" varchar NOT NULL,
  "user_id" integer NOT NULL,
  "avatar_url" varchar NOT NULL,
  "followers" integer NOT NULL,
  "name" varchar NOT NULL,
  "public_repos" integer NOT NULL,
  "repos_url" varchar NOT NULL
  );

*/

const supertest = require('supertest');

// app must not be listening in server.js file for tests to run
const app = require('../server/server');

const request = supertest(app);

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request
          .get('/supertest')
          .expect('Content-Type', /application\/json/)
          .expect(201);
      });
    });
  });
});

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});
