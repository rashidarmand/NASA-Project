const axios = require('axios');

const launches = require('./launches.mongoose');
const planets = require('./planets.mongoose');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER, // flight_number
  mission: 'Kepler Exploration X', // name
  rocket: 'Explorer IS1', // rocket.name
  launchDate: new Date('December 27, 2030'), // date_local
  target: 'Kepler-442 b', // n/a
  customers: ['ZTM', 'NASA'], // payloads.customers for each payload
  upcoming: true, // upcoming
  success: true, // success
};

saveLaunch(launch); // Seed DB

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
  console.log('Downloading Launch Data...');
  const res = await axios.post(SPACEX_API_URL, {
    options: {
      pagination: false,
      populate: [
        {
          path: 'payloads',
          select: 'customers',
        },
        {
          path: 'rocket',
          select: 'name',
        },
      ],
    },
  });

  if (res.status !== 200) {
    console.error('Problem downloading launch data!');
    throw new Error('Launch data download failed!');
  }

  const launchDocs = res.data.docs;
  for (const launchDoc of launchDocs) {
    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers: launchDoc['payloads'].flatMap(
        (payload) => payload['customers']
      ),
    };
    console.log(`${launch.flightNumber} - ${launch.mission}`);
    await saveLaunch(launch);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  if (firstLaunch) console.log('Launch data already loaded.');
  else await populateLaunches();
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function launchWithIdExists(launchId) {
  return await launches.exists({ flightNumber: launchId });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort('-flightNumber');
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  await launches.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.exists({ keplerName: launch.target });
  if (!planet) throw new Error('No matching planet found!');

  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = { ...launch, flightNumber: latestFlightNumber };
  await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
  const aborted = await launches.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );

  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchesData,
  launchWithIdExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
