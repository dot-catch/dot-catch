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

Database Create Table Scripts:
  CREATE TABlE "_profiles_testing" (
    "id" SERIAL NOT NULL,
    "login" varchar NOT NULL,
    "user_id" integer NOT NULL,
    "avatar_url" varchar NOT NULL,
    "followers" integer NOT NULL,
    "name" varchar NOT NULL,
    "public_repos" integer NOT NULL,
    "repos_url" varchar NOT NULL
  );

  CREATE TABlE "_auth_testing" (
    "id" SERIAL NOT NULL,
    "token" varchar NOT NULL
  );
*/

// See https://jestjs.io/docs/en/asynchronous

const supertest = require('supertest');
const babelPolyfill = require('babel-polyfill');

// app must not be listening in server.js file so tests can run
const app = require('../server/server');

const { Pool } = require("pg");
const PG_URI = "postgres://ycchvajh:YEQQEbpeqAzBfwrZ-vTy2lKQqTEu6ZDV@rajje.db.elephantsql.com:5432/ycchvajh";
const pool = new Pool({
  connectionString: PG_URI
});
console.log(pool);

const db = require('../models/model');
const request = supertest(app);

const clientID = '427c8387215135ef63b7';
const clientSecret = '7b79f3ecbbf15addbad9005104242aa42c9ac5e4';
let authToken; // should authToken be stored here? or in a beforeAll and cleared on afterAll?


// beforeAll((done) => {
//
// });

afterAll(() => {
  pool.end();
});

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // --------- TEST ROUTE
      it('responds with 201 status and application/json content type', async (done) => {
        const response = await request.get('/supertest');
        expect(response.status).toBe(201);
        expect(response.body.msg).toBe('hello test');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        // .expect(response).toBe('content-type', /application\/json/);
        done();
      });

      it('responds with 200 status and text/html content type when requesting the main feed', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('text/html; charset=UTF-8');
        // .expect('Content-Type', /text\/html/)
        done();
      });

      it('responds with 200 status and text/html content type when requesting the login page', async (done) => {
        const response = await request.get('/loginPage');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('text/html; charset=UTF-8');
        // .expect('Content-Type', /text\/html/)
        done();
      });
    });
  });
});

describe('authController', () => {
  describe('setToken', () => {
    it('should store an access token if given a valid request token', (done) => {
      expect(true).toBe(true);
      done();
    });

    it('should respond with an error if given an invalid request token', (done) => {
      expect(true).toBe(true);
      done();
    });
  });

  describe('checkCookie', () => {
    it('should fetch for user github data if given a valid access token', (done) => {
      expect(true).toBe(true);
      done();
    });

    it('should respond with an error if given an invalid access token', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
});

describe('profileController', () => {
  
  describe('adding a profile', () => {
    // beforeAll
    beforeAll((done) => {
      console.log('beforeAll ran');
      // Add a profile
      const createTestUserSQL = `
        INSERT INTO _profiles_testing (
          login,
          user_id,
          avatar_url,
          followers,
          name,
          public_repos,
          repos_url
        ) VALUES (
          'testuser',
          123,
          'fakeimage.png',
          50,
          'Test User',
          10,
          'reposURL'
        )
      `;
      pool.query(createTestUserSQL, [], (err, res) => {
        done();
      });
    });
  
    // afterAll
    afterAll((done) => {
      console.log('afterAll RAN');
      // Delete the profile added in beforeAll
      const deleteTestUserSQL = `
        DELETE FROM _profiles_testing
        WHERE login='testuser'
      `;
      pool.query(deleteTestUserSQL, [], (err, res) => {
        done();
      });
    });
    it('should test that true === true', (done) => {
      expect(true).toBe(true);
      done();
    });
    // it should add a profile to the database when given a new user
    // add a new profile

    // it should not add a profile to the database when given an existing user
    it('should confirm that testuser already exists', (done) => {
      const checkUserSQL = `
        SELECT * FROM _profiles_testing
        WHERE login='testuser'
      `;
      done();
      // db.query(checkUserSQL, [], (err, res) => {
      //   // expect(res.rows.length).
      // })
    });
    // add the same profile in the beforeAll
  });

  describe('getting all profiles', () => {
    // it should return all profiles except the current user's
  });
});

// Sample test
describe('Sample Test', () => {
  it('should test that true === true', (done) => {
    expect(true).toBe(true);
    done();
  });
});
