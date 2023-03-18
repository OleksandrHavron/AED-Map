import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-mapbox-gl';

import mapPin from 'shared/icons/map-add-point.svg';

import { useAddedPinStyles } from '../model/use-styles';

const AddedPin = ({ coordinates }) => {
  const classes = useAddedPinStyles();
  return (
    <Marker
      className={classes.marker}
      coordinates={coordinates}
    >
      <div>
        <img
          alt="New map pin"
          src={mapPin}
          className={classes.pin}
        />
      </div>
    </Marker>
  );
};

AddedPin.propTypes = {
  coordinates: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }).isRequired
};

export default AddedPin;
