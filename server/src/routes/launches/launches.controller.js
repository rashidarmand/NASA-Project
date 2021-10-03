const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  const requiredLaunchDetails = ['mission', 'rocket', 'launchDate', 'target'];
  const missingLaunchDetails = requiredLaunchDetails.filter((detail) => {
    const launchInput = Object.entries(launch);
    return (
      !launchInput.some((val) => val[0] === detail) ||
      launchInput.some((val) => val[0] === detail && val[1] === undefined)
    );
  });
  if (missingLaunchDetails.length > 0) {
    const message = missingLaunchDetails.map(
      (launchDetail) => `${launchDetail} is required.`
    );
    return res.status(400).json({ error: 'Missing Launch Details.', message });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({ error: 'Invalid Launch Date' });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
