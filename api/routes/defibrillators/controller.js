const mongoose = require('mongoose');
const { invoke } = require('lodash');

const { Defibrillator } = require('../../../db/models');
const {
  gridFSBucketService
} = require('../../../shared/services/grid-fs-bucket');
const { resServerError } = require('../../../shared/utils');
const { createFilter } = require('./filter');

module.exports.getDefibrillators = async (req, res) => {
  try {
    const filter = createFilter(req);
    const perPage = Number(req.query.per_page) || 10;
    const page = Number(req.query.page) || 1;
    let listDefs;

    if (req.query.longitude) {
      listDefs =
        (await Defibrillator.find(filter)
          .select('address title location owner blocked')
          .where('location')
          .near({
            center: {
              type: 'Point',
              coordinates: [
                req.query.longitude,
                req.query.latitude
              ]
            }
          })
          .skip(perPage * (page - 1))
          .limit(perPage)) || [];
    } else {
      listDefs =
        (await Defibrillator.find(filter)
          .select('address title location owner blocked')
          .skip(perPage * (page - 1))
          .limit(perPage)) || [];
    }

    const mapDefs = await Defibrillator.find(filter).select(
      'address title location owner'
    );

    const totalCount = Math.ceil(mapDefs.length / perPage);

    return res
      .status(200)
      .send({ listDefs, mapDefs, totalCount });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.getNearestDevices = async (req, res) => {
  try {
    const requestHour = new Date().getHours();
    const listDefs = await invoke(Defibrillator, req.query?.single ? 'findOne' : 'find', {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [
              req.query.longitude,
              req.query.latitude
            ]
          },
          $maxDistance: 15000
        }
      },
      $or: [
        { availableFrom: null },
        { availableFrom: { $lt: requestHour } }
      ],
      $or: [
        { availableUntil: null },
        { availableUntil: { $gt: requestHour } }
      ]
    });

    return res.status(200).send({ listDefs });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.createDefibrillator = async (req, res) => {
  try {
    const defibrillator = await Defibrillator.create({
      ...req.body,
      owner: req.user._id
    });

    return res.status(201).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.updateDefibrillator = async (req, res) => {
  try {
    const { id } = req.params;
    const defibrillator = await Defibrillator.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.status(200).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.blockDefibrillator = async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;
    const defibrillator = await Defibrillator.findByIdAndUpdate(
      id,
      { blocked: blocked },
      { new: true }
    );

    return res.status(200).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.getDefibrillator = async (req, res) => {
  try {
    const { id } = req.params;
    const defibrillator = await Defibrillator.findById(id);

    return res.status(200).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.deleteDefibrillator = async (req, res) => {
  try {
    const { id } = req.params;
    const defibrillator = await Defibrillator.findByIdAndDelete(
      id
    );

    defibrillator.images.forEach((image) => {
      gridFSBucketService.delete(
        new mongoose.Types.ObjectId(image.id),
        (err, data) => {
          if (err)
            return res.status(500).json({
              message: 'Не вдалося видалити зображення.'
            });
        }
      );
    });

    return res.status(200).send({
      error: false,
      defibrillator
    });
  } catch (e) {
    resServerError(res, e);
  }
};
