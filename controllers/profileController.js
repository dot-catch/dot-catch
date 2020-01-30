const db = require("../models/model.js");

const profileController = {};

(profileController.addProfile = (req, res, next) => {
  // Tried to set up single query using NOT EXISTS to prevent duplicate profiles.  Did not work.  Thus two queries.
  console.log("RES LOCALS FROM ADDPROFILE: ", res.locals);
  console.log("addProfile middleware executed");
  const login = [res.locals.userGithubProfile.login];
  const checkQuery = {
    name: "profile-check",
    text: "SELECT * FROM profiles WHERE login = $1",
    values: login
  };
  db.query(checkQuery, (err, profile) => {
    // if query returns anything, that means that a profile for the user already exists
    console.log("querying the database");
    if (profile.rows.length > 0) {
      // If any profiles return, rows array has objects in it.  Thus length greater than one, there's a profile.
      console.log("profile already exists");
      // res.send({ msg: 'Profile already exists' }); // THIS SHORTCIRCUITS MIDDLEWARE CHAIN
      return next();
    } else {
      console.log("profile does not exist");
      const fields = [
        "login",
        "id",
        "avatar_url",
        "followers",
        "name",
        "public_repos",
        "repos_url"
      ];
      const values = [];
      for (let i = 0; i < fields.length; i += 1) {
        // These checks not really necessary at this time, since data is coming from github, not user input.  If user input allowed, will probably be needed.
        const val = res.locals.userGithubProfile[fields[i]];
        if (val !== undefined || val !== null) {
          // Iterates through all DB fields (hardcoded into array), checks if present in res.locals.userGithubProfile
          values.push(val);
        } else values.push("N/A");
      }
      // using separate variables for inputs to avoid risk of SQL injection attacks
      const text =
        "INSERT INTO profiles(login, user_id, avatar_url, followers, name, public_repos, repos_url) VALUES($1, $2, $3, $4, $5, $6, $7)";
      const query = {
        name: "add-profile",
        text,
        values
      };
      db.query(query, (err, profile) => {
        // Error handler does not currently display errors from middleware failures.  TODO
        if (err) {
          return next(err);
        }
        // res.send('User added'); // Had response sent here for testing purpoess, probably would be better practice to set something to res.locals, check it in server, then send.
        return next();
      });
    }
  });
}),
  (profileController.getAllProfiles = (req, res, next) => {
    console.log("getAllProfiles middleware executed");
    const text = "SELECT * FROM profiles WHERE login<>$1";
    const values = [res.locals.userGithubProfile.login]; // Fairly sure that values in query object always has to be array, not 100%
    const query = {
      name: "get-all-profiles",
      text,
      values
    };
    db.query(query, (err, profiles) => {
      if (err) {
        return next(err);
      }
      res.locals.allProfiles = profiles.rows;
      return next();
    });
  });

module.exports = profileController;
