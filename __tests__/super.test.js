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

// app must not be listening in server.js file so tests can run
const app = require('../server/server');
const db = require('../models/model');

const request = supertest(app);
console.log(request.get('/supertest'));
// request.get('/supertest').then(data => console.log(data)).catch(err => console.log(err));

const clientID = '427c8387215135ef63b7';
const clientSecret = '7b79f3ecbbf15addbad9005104242aa42c9ac5e4';
let authToken; // should authToken be stored here? or in a beforeAll and cleared on afterAll?

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {

      // --------- TEST ROUTE
      it('responds with 200 status and text/html content type', async (done) => {
        // return request.get('/supertest')
        //   .expect('Content-Type', /application\/json/)
        //   .expect(200);


        // const response = await request.get('/supertest');

        // expect(response.header).toBe('Content-Type', /application\/json/);
        // expect(response.status).toBe(201);

        // done();
      });

      it('responds with 200 status and text/html content type when requesting the main feed', () => {
        // return request
        //   .get('/')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });

      it('responds with 200 status and text/html content type when requesting the login page', () => {
        // return request
        //   .get('/loginPage')
        //   .expect('Content-Type', /text\/html/)
        //   .expect(200);
      });
    });
  });
});

describe('authController', () => {
  describe('setToken', () => {
    it('should store an access token if given a valid request token', () => {
      expect(true).toBe(true);
    });

    it('should respond with an error if given an invalid request token', () => {
      expect(true).toBe(true);
    });
  });

  describe('checkCookie', () => {
    it('should fetch for user github data if given a valid access token', () => {
      expect(true).toBe(true);
    });

    it('should respond with an error if given an invalid access token', () => {
      expect(true).toBe(true);
    });
  });
});

describe('profileController', () => {
  // beforeAll
  beforeAll(() => {
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
        'Abaas Khorrami',
        10,
        'reposURL'
      )
    `;
    // db
    //   .query(createTestUserSQL, [])
    //   .catch((err) => console.log(err));
  });

  // afterAll
  afterAll(() => {
    console.log('afterAll RAN');
    // Delete the profile added in beforeAll
    const deleteTestUserSQL = `
      DELETE FROM _profiles_testing
      WHERE login='testuser'
    `;
    // db
    //   .query(deleteTestUserSQL, [])
    //   .catch((err) => console.log(err));
  });

  describe('adding a profile', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true);
    });
    // it should add a profile to the database when given a new user
    // add a new profile

    // it should not add a profile to the database when given an existing user
    // add the same profile in the beforeAll
  });

  describe('getting all profiles', () => {
    // it should return all profiles except the current user's
  });
});

// Sample test
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});


// const createTestUserSQL = `
//   INSERT INTO _profiles_testing (
//     login,
//     user_id,
//     avatar_url,
//     followers,
//     name,
//     public_repos,
//     repos_url
//   ) VALUES (
//     'testuser',
//     123,
//     'fakeimage.png',
//     50,
//     'Abaas Khorrami',
//     10,
//     'reposURL'
//   )
// `;

// db.query(createTestUserSQL, [], (err, res) => console.log(res.rows));
