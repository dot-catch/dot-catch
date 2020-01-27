const db = require ('../models/model.js');

const profileController = {};

// profileController.addProfile = (req, res, next) => {
//     console.log('add controller');
//     const fields = ['login','user_id','avatar_url','followers','name','public_repos','repos_url'];
//     const values = [];
//     for (let i = 0; i<fields.length;i+=1) {
//         if (req.body[fields[i]]) {
//             // console.log(fields[i], ': ', req.body[fields[i]]);
//             values.push(req.body[fields[i]]);
//         } else values.push('');
//     }
//     values.push(req.body.login);
//     // using separate variables for inputs to avoid risk of SQL injection attacks
//     const text = 'INSERT INTO profiles(login, user_id, avatar_url, followers, name, public_repos, repos_url) VALUES($1, $2, $3, $4, $5, $6, $7) WHERE EXISTS(SELECT 1 FROM profiles WHERE profiles.login = $8)';
//     const query = { 
//         name: 'add-profile',
//         text: text,
//         values, values
//     }
//     db.query(query, (err, profile) => {
//         if (err) {
//             return next(err);
//         } else {
//             return next();
//         }
//     });
// }

profileController.getAllProfiles = (req, res, next) => {
    console.log('Get All Controller');
    const text = 'SELECT * FROM profiles WHERE login<>$1';
    const values =[req.body.login];
    const query = {
        name: 'get-all-profiles',
        text: text,
        values: values
    }
    db.query(text, values, (err, profiles) => {
        if (err) {
            return next(err);
        } else {
            // res.status(200).send(address.rows)};
            res.locals.allProfiles = profiles.rows;
            return next();
        }
    });
}

module.exports = profileController;