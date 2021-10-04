const launches = require('./launches.mongoose');
const planets = require('./planets.mongoose');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch); // Seed DB

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
  const planet = await planets.exists({ keplerName: launch.target });

  if (!planet) throw new Error('No matching planet found!');

  await launches.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

async function scheduleNewLaunch(launch) {
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
  launchWithIdExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
