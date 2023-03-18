const express = require('express');
const passport = require('passport');

// Check permissions middleware
const {
  imageDeletePermission,
  imageCreatePermission
} = require('../../../shared/middleware');

const controller = require('./controller');

// Create router
const router = express.Router();

// Route for creating image
router.post(
  '/:defibrillatorId',
  passport.authenticate('jwt', { session: false }),
  imageCreatePermission,
  controller.createImage
);

// Route for receiving image
router.get('/:imageName', controller.getImage);

// Route for removing image
router.delete(
  '/:defibrillatorId/:imageId',
  passport.authenticate('jwt', { session: false }),
  imageDeletePermission,
  controller.removeImage
);

module.exports = router;
