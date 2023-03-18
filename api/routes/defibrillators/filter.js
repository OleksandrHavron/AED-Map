const {
  USER,
  ADMIN
} = require('../../../shared/consts');

const { getTime, handleAvailableParam } = require('./service');

const createFilter = (req) => {
  const { query } = req;
  const filter = { $and: [] };
  const skipKeys = [
    'page',
    'per_page',
    'longitude',
    'latitude',
    'availableFrom'
  ]

  Object.keys(query).forEach((key) => {
// if the avalibaleFrom query Key equals to ʼцілодобовоʼ than add it to filter
// else we will add those defs, that are avaliable at the time request is made
    if (key === 'availableFrom') {
      handleAvailableParam(filter, query[key])
    }
    if (!skipKeys.includes(key)) {
      filter.$and.push({ [key]: new RegExp(query[key], 'i') })
    }
  });

  if (filter.$and.length === 0) {
    delete filter.$and
  }

  const authorized =
    req.role === ADMIN || req.role === USER;
  if (!authorized) {
    filter['blocked'] = { $ne: true };
  }
  return filter;
};

module.exports = { createFilter };
