const db = require ('../models/model.js');

const profileController = {};

profileController.addProfile = (req, res, next) => { // Tried to set up single query using NOT EXISTS to prevent duplicate profiles.  Did not work.  Thus two queries.
    const login = [req.body.login];
    const checkQuery = {
        name: 'profile-check',
        text: 'SELECT * FROM profiles WHERE login = $1',
        values: login
    }
    db.query(checkQuery, (err, profile) => {  //if query returns anything, that means that a profile for the user already exists
        if (profile.rows.length > 0) {  // If any profiles return, rows array has objects in it.  Thus length greater than one, there's a profile.  
            res.send('Profile already exists');
        } else {
            const fields = ['login','user_id','avatar_url','followers','name','public_repos','repos_url'];
            const values = [];
            for (let i = 0; i<fields.length;i+=1) { //These checks not really necessary at this time, since data is coming from github, not user input.  If user input allowed, will probably be needed.  
                if (req.body[fields[i]]) {  // Iterates through all DB fields (hardcoded into array), checks if present in req.body
                    values.push(req.body[fields[i]]);
                } else values.push('');
            }
            // using separate variables for inputs to avoid risk of SQL injection attacks
            const text = 'INSERT INTO profiles(login, user_id, avatar_url, followers, name, public_repos, repos_url) VALUES($1, $2, $3, $4, $5, $6, $7)';
            const query = { 
                name: 'add-profile',
                text: text,
                values: values
            }
            db.query(query, (err, profile) => { //Error handler does not currently display errors from middleware failures.  TODO
                if (err) {
                    return next(err);
                } else {
                    res.send('User added')  //Had response sent here for testing purpoess, probably would be better practice to set something to res.locals, check it in server, then send.
                    return next();
                }
            });
        }
    })
},

profileController.getAllProfiles = (req, res, next) => {
    const text = 'SELECT * FROM profiles WHERE login<>$1';
    const values =[req.body.login];  //Fairly sure that values in query object always has to be array, not 100%
    const query = {
        name: 'get-all-profiles',
        text: text,
        values: values
    }
    db.query(query, (err, profiles) => {
        if (err) {
            return next(err);
        } else {
            res.locals.allProfiles = profiles.rows;
            return next();
        }
    });
}

module.exports = profileController;