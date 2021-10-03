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

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
