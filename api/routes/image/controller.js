const multer = require('multer');
const mongoose = require('mongoose');

const { getStorage } = require('./storage');

// Model of the collection 'defibrillators'
const { Defibrillator } = require('../../../db/models');

// GridFS
const {
  gridFSBucketService
} = require('../../../shared/services/grid-fs-bucket');

// Handler for server error
const { resServerError } = require('../../../shared/utils');

module.exports.getImage = async (req, res) => {
  try {
    gridFSBucketService
      .find({
        filename: req.params.imageName
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            message: 'Зображення з даним іменем відсутнє.'
          });
        }

        gridFSBucketService
          .openDownloadStreamByName(req.params.imageName)
          .pipe(res);
      });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.createImage = (req, res) => {
  const upload = multer({
    storage: getStorage(mongoose.connection.name)
  }).array('images');

  upload(req, res, async (err) => {
    try {
      const defibrillator = await Defibrillator.findById(
        req.params.defibrillatorId
      ).select('images');
      const newImages = req.files.map((file) => ({
        id: file.id,
        filename: file.filename
      }));

      await Defibrillator.findByIdAndUpdate(
        req.params.defibrillatorId,
        {
          images: [...defibrillator.images, ...newImages]
        },
        { new: true }
      );

      res.status(201).json({
        images: req.files.map((file) => ({
          id: file.id,
          filename: file.filename
        }))
      });
    } catch (e) {
      resServerError(res, e);
    }
  });
};

module.exports.removeImage = async (req, res) => {
  try {
    const defibrillator = await Defibrillator.findById(
      req.params.defibrillatorId
    ).select('images');

    await Defibrillator.findByIdAndUpdate(
      req.params.defibrillatorId,
      {
        images: defibrillator.images.filter(
          (image) => image.id !== req.params.imageId
        )
      },
      { new: true }
    );

    gridFSBucketService.delete(
      new mongoose.Types.ObjectId(req.params.imageId),
      (err, data) => {
        if (err)
          return res.status(500).json({
            message: 'Не вдалося видалити зображення.'
          });
        return res.status(200).end();
      }
    );
  } catch (e) {
    resServerError(res, e);
  }
};
