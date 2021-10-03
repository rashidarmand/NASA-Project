const express = require('express');

const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

launchesRouter.route('/').get(httpGetAllLaunches).post(httpAddNewLaunch);
launchesRouter.route('/:id').delete(httpAbortLaunch);

module.exports = launchesRouter;
