const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  launchWithIdExists,
} = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
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
    return res.status(400).json({ error: 'Invalid Launch Date.' });
  }

  try {
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (err) {
    return res.status(400).json({ error: { message: `${err}` } });
  }
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!launchId) {
    return res.status(400).json({ error: 'Launch ID is required.' });
  }
  const launchExists = await launchWithIdExists(launchId);

  if (!launchExists) {
    return res.status(404).json({ error: 'Launch Not found.' });
  }

  const aborted = await abortLaunch(launchId);
  if (!aborted) {
    return res.status(400).json({ error: 'Launch not aborted.' });
  }
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
