const express = require('express');

const planetsRouter = express.Router();

const { httpGetAllPlanets } = require('./planets.controller');

planetsRouter.route('/').get(httpGetAllPlanets);

module.exports = planetsRouter;
