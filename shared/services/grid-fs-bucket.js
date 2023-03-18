const mongoose = require('mongoose');

class GridFSBucketService {
  get find() {
    return this.gfs.find;
  }

  get delete() {
    return this.gfs.delete;
  }

  get openDownloadStreamByName() {
    return this.gfs.openDownloadStreamByName;
  }

  init(db) {
    this.gfs = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'images'
    });
  }
}

const gridFSBucketService = new GridFSBucketService();

module.exports = {
  GridFSBucketService,
  gridFSBucketService
};
