const { USER, ADMIN } = require('./user-role-state');
const {
  PRESENT,
  MISSING,
  PRESENT_IN_BUILDING,
  PRESENT_NEAR_APPLIANCE
} = require('./informational-plate-state');
const AVAILABLE_ROUND_THE_CLOCK = 'цілодобово';
const AVAILABLE_NOW = 'доступний зараз';

module.exports = {
  USER,
  ADMIN,

  PRESENT,
  MISSING,
  PRESENT_IN_BUILDING,
  PRESENT_NEAR_APPLIANCE,
  
  AVAILABLE_ROUND_THE_CLOCK,
  AVAILABLE_NOW
};
