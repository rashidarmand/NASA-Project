const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function launchWithIdExists(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return [...launches.values()];
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ['Elon Musk', 'SpaceX'],
    upcoming: true,
    success: true,
  });
}

function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  launchWithIdExists,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
