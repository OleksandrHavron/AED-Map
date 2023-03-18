const authRouter = require('./auth');
const gmapRouter = require('./gmap');
const imageRouter = require('./image');
const defibrillatorsRouter = require('./defibrillators');

module.exports = {
  authRouter,
  gmapRouter,
  imageRouter,
  defibrillatorsRouter
};
