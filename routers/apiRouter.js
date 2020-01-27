const express = require('express');
const profileController = require('../controllers/profileController.js');
const apiRouter = express.Router();

apiRouter.post('/addUser', profileController.addProfile, (req,res) => {
    // res.sendStatus(200);
});

apiRouter.post('/getAll', profileController.getAllProfiles, (req, res) => {
    res.status(200).send(res.locals.allProfiles);
});

module.exports = apiRouter;