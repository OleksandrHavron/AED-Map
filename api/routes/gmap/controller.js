const {
  getGeocodingOptions,
  getGeocodingDetails,
  getReverseGeocoding
} = require('../../../shared/utils');

module.exports.getGeocodingOptions = async (req, res) => {
  const { value } = req.params;

  const result = await getGeocodingOptions(value);
  return res.status(200).send(result.data);
};

module.exports.getGeocodingDetails = async (req, res) => {
  const { id } = req.params;

  const result = await getGeocodingDetails(id);
  return res.status(200).send(result.data);
};

module.exports.getReverseGeocoding = async (req, res) => {
  const { lng, lat } = req.params;

  const result = await getReverseGeocoding(lng, lat);
  return res.status(200).send(result.data);
};
