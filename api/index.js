const {
  authRouter,
  gmapRouter,
  imageRouter,
  defibrillatorsRouter
} = require('./routes');

module.exports = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/gmap', gmapRouter);
  app.use('/api/images', imageRouter);
  app.use('/api/defibrillators', defibrillatorsRouter);
};
