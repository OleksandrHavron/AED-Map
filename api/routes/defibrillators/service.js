const defaultTimezone = 3;
const { isEqual } = require('lodash');
const {
  AVAILABLE_ROUND_THE_CLOCK,
  AVAILABLE_NOW
} = require('../../../shared/consts');

// pass timeZoneCorrection to configure timezone of the client
const getTime = ( timeZoneCorrection = defaultTimezone ) => {
  return new Date().getUTCHours() + timeZoneCorrection
};

const handleAvailableParam = ( filter, queryKey ) => {
  filter.$and.push({
    ...(isEqual(queryKey, AVAILABLE_ROUND_THE_CLOCK) &&
      { ['fullTimeAvailable']: true }),
    ...(isEqual(queryKey, AVAILABLE_NOW) &&
      { $or: [
        { ['fullTimeAvailable']: true },
        {
          ['availableFrom']: { $gt: getTime() },
          ['availableUntil']: { $lt: getTime() }
        }
      ]}
    )
  })
}

module.exports = {
  getTime,
  handleAvailableParam
}
