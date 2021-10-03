const API_URL = 'http://localhost:8000';

// Load planets and return as JSON
async function httpGetPlanets() {
  const req = await fetch(`${API_URL}/planets`);
  const planets = await req.json();
  return planets;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const req = await fetch(`${API_URL}/launches`);
  const launches = await req.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
