const express = require('express');
const passport = require('passport');

// Validation rules and function for routers
const {
  emailValidationRules,
  passwordValidationRules
} = require('../../validation/authRouteValidator');
// middleware
const {
  validate,
  adminPermission
} = require('../../../shared/middleware');
// controller
const controller = require('./controller');

// Create router
const router = express.Router();

// Route for registration - send mail
router.post(
  '/signup/sendmail',
  passport.authenticate('jwt', { session: false }),
  adminPermission,
  emailValidationRules(),
  validate,
  controller.userSuccessfullySignUp
);
// Route for registration
router.post(
  '/signup',
  passwordValidationRules(),
  validate,
  controller.userSignUp
);
// Route for authentication
router.post('/signin', controller.userSignIn);
// Route for resetting password - send mail
router.post(
  '/reset/sendmail',
  emailValidationRules(),
  validate,
  controller.passwordSuccessfullyReset
);
// Route for resetting password
router.post(
  '/reset',
  passwordValidationRules(),
  validate,
  controller.passwordReset
);
// Route for authorization
router.get(
  '/validate',
  passport.authenticate('jwt', { session: false }),
  controller.validateUser
);

module.exports = router;
