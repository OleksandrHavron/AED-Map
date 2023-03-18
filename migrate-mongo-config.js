const path = require('path');

const config = {
  mongodb: {
    databaseName: process.env.MONGO_DB || 'defibrillatorDB',
    url:
      process.env.MONGO_URL || 'mongodb://localhost:27017/',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationFileExtension: '.js',
  changelogCollectionName: 'changelog',
  migrationsDir: path.resolve(__dirname, 'db', 'migrations')
};

module.exports = config;
