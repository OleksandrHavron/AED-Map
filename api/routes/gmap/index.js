const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get(
  '/options/:value',
  controller.getGeocodingOptions
);
router.get('/details/:id', controller.getGeocodingDetails);
router.get(
  '/reversegeocode/:lng/:lat',
  controller.getReverseGeocoding
);

module.exports = router;
