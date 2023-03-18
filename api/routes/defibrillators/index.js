const express = require('express');
const passport = require('passport');

const {
  validate,
  checkPermission,
  adminPermission,
  defChangePermission
} = require('../../../shared/middleware');
const {
  deffValidationRules
} = require('../../validation/deffRouteValidator');

const controller = require('./controller');

const router = express.Router();

router.get(
  '/',
  checkPermission,
  controller.getDefibrillators
);
router.get('/nearestDevices', controller.getNearestDevices);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  deffValidationRules(),
  validate,
  controller.createDefibrillator
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  defChangePermission,
  controller.updateDefibrillator
);
router.put(
  '/block/:id',
  passport.authenticate('jwt', { session: false }),
  adminPermission,
  controller.blockDefibrillator
);
router.get('/:id', controller.getDefibrillator);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  defChangePermission,
  controller.deleteDefibrillator
);

module.exports = router;
