# NASA Mission Control

NASA Mission Control Project with SpaceX Launch Data

> [Click here](https://nasamissioncontrol.xyz) to view live site

## Background

As part of the [Artemis Project](https://www.nasa.gov/specials/artemis/) to bring humans back to the moon, I received a special mission from NASA to explore the possibility of bringing humans to other solar systems. More specifically [exoplanets](https://exoplanets.nasa.gov/what-is-an-exoplanet/overview/). Not just any exoplanets, only the most habitable exoplanets observed by NASA's Kepler space telescope and classified as [Kepler Objects of Interest](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative).

To complete this mission, I built a NASA mission control dashboard to schedule missions targeting these habitable Kepler Exoplanets. This mission control dashboard provides the ability to:

- Schedule new space launches to the habitable Kepler exoplanets
- View upcoming space launches and/or cancel them
- View historical launches

## Technology

- Node.js
- Docker
- React
- AWS EC2
- MongoDB
- Github Actions

## Favorite Highlights

- Integrated historical space launch data from the SpaceX API
- API integration tests via Jest + SuperTest
- CI-CD pipeline set up with Github Actions
- Deployed dockerized application to Linux Amazon EC2 instance
