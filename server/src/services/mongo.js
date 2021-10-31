const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_TESTING_URL = process.env.MONGO_TESTING_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect(options = { testing: false }) {
  if (options.testing) {
    await mongoose.connect(MONGO_TESTING_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
