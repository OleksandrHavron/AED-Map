const { validate } = require('./validate');
const {
  checkPermission,
  adminPermission,
  defChangePermission,
  imageCreatePermission,
  imageDeletePermission
} = require('./permission');

module.exports = {
  validate,
  checkPermission,
  adminPermission,
  defChangePermission,
  imageCreatePermission,
  imageDeletePermission
};
