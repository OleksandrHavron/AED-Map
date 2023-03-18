const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const passport = require('passport');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 3012;

const bootstrap = () => {
  // Websocket event for sign out
  require('./shared/websocket')(server);

  app.use(
    cors({
      preflightContinue: false,
      optionsSuccessStatus: 204,
      origin: process.env.BASE_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('client/build'));
  app.use(express.static('client/testing'));

  // Initialize api
  require('./api')(app);

  // Middlewares for passport
  app.use(passport.initialize());
  require('./shared/middleware/passport')(passport);

  app.get('*', (_req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = { app, bootstrap };
