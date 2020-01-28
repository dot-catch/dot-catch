const express = require('express');
const profileController = require('../controllers/profileController.js');
const apiRouter = express.Router();

// router to add a profileto the database
apiRouter.post('/addUser', profileController.addProfile, (req,res) => {
    // res.sendStatus(200);  Currently handled in the controller itself for testing reasons.  Should be changed to here or server.js
});

// router to get all users from the database
apiRouter.post('/getAll', profileController.getAllProfiles, (req, res) => {
    res.status(200).send(res.locals.allProfiles);
});

module.exports = apiRouter;
