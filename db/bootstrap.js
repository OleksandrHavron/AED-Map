require('./connection');
const { up, database } = require('migrate-mongo');

const emptyFn = () => null;

async function bootstrap(callback = emptyFn) {
  const { db, client } = await database.connect();

  await up(db, client);

  callback();
}

module.exports = bootstrap;
