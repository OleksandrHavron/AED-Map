const database = require('./db');
const server = require('./server');

database.bootstrap(server.bootstrap);
