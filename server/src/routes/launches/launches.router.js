const express = require('express');

const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require('./launches.controller');

launchesRouter.route('/').get(httpGetAllLaunches).post(httpAddNewLaunch);

module.exports = launchesRouter;
