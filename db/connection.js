const mongoose = require('mongoose');
const {
  gridFSBucketService
} = require('../shared/services/grid-fs-bucket');

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/';
const MONGO_DB = process.env.MONGO_DB || 'defibrillatorDB';

function createConnection() {
  mongoose.connect(`${MONGO_URL}${MONGO_DB}`, {
    dbName: MONGO_DB,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  const connection = mongoose.connection;

  connection.on('error', (error) =>
    console.log(`\u001b[1;31m\nDatabase error: ${error}`)
  );
  connection.once('open', () => {
    gridFSBucketService.init(connection.db);

    console.log(
      '\u001b[1;32m\nConnection to database established'
    );
  });

  return connection;
}

module.exports = createConnection();
