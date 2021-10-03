const express = require('express');

const launchesRouter = express.Router();

const { httpGetAllLaunches } = require('./launches.controller');

launchesRouter.route('/launches').get(httpGetAllLaunches);

module.exports = launchesRouter;
