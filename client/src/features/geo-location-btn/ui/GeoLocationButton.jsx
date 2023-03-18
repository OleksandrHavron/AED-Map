import React from 'react';
import PropTypes from 'prop-types';

import { useGeoLocationBtnStyles } from '../model/use-styles';

const getLocationButton = useGeoLocationBtnStyles();

function GeoLocationButton({ currentLocation }) {
  return (
    <img
      style={getLocationButton}
      onClick={currentLocation}
      src="https://img.icons8.com/ios/50/000000/east-direction.png"
      alt="search"
    />
  );
}

GeoLocationButton.propTypes = {
  currentLocation: PropTypes.func
};

export default GeoLocationButton;
