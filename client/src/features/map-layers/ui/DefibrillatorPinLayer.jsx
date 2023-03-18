/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Cluster, Marker } from 'react-mapbox-gl';
import { useDefirilatorPinLayerStyles } from '../model/use-styles';

import mapPin from 'shared/icons/map-pin-icon.jpg';
import activeMapPin from 'shared/icons/active-map-pin-icon.jpg';

import { setActive } from 'shared/store/defs/actions';
import { showPopup } from 'shared/store/popup/actions';
import geoJsonData from 'widgets/map-holder/lib/geoJsonData';

const DefibrillatorPinLayer = ({
  defibrillators,
  showPopup,
  makeItemActive,
  defibrillatorsActiveId,
  history
}) => {
  const GEO_JSON_DATA = geoJsonData(defibrillators);
  const classes = useDefirilatorPinLayerStyles();

  const defibrillatorPinClick = feature => {
    const { defID } = feature.properties;
    const { coordinates } = feature.geometry;
    const currentRoute = window.location.pathname;
    if (
      currentRoute !== '/add-form' &&
      !currentRoute.includes('/edit-form')
    ) {
      showPopup({
        data: {
          id: defID
        },
        coordinates
      });
      makeItemActive(defID);
      history.push(`/?id=${defID}`);
    }
  };

  const clusterRender = GEO_JSON_DATA.features.map(
    feature => {
      return (
        <Marker
          className={classes.marker}
          key={feature.properties.defID}
          coordinates={feature.geometry.coordinates}
          onClick={() => defibrillatorPinClick(feature)}
        >
          <div className={classes.markerWrapper}>
            <img
              alt="Map Pin"
              src={
                defibrillatorsActiveId ===
                feature?.properties?.defID
                  ? activeMapPin
                  : mapPin
              }
              className={classes.pin}
            />
            <p className={classes.title}>
              {feature.properties.title}
            </p>
          </div>
        </Marker>
      );
    }
  );

  const clusterMarker = (coordinates, pointCount) => {
    return (
      <Marker
        key={coordinates}
        coordinates={coordinates}
        className={classes.clusterMarker}
      >
        {pointCount}
      </Marker>
    );
  };

  return (
    <Cluster
      ClusterMarkerFactory={clusterMarker}
      zoomOnClick
      zoomOnClickPadding={80}
      radius={100}
      extent={290}
    >
      {clusterRender}
    </Cluster>
  );
};

DefibrillatorPinLayer.defaultProps = {
  defibrillators: [],
  showPopup: () => null
};

DefibrillatorPinLayer.propTypes = {
  defibrillators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      address: PropTypes.string,
      location: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      }),
      actual_date: PropTypes.string,
      floor: PropTypes.number,
      storage_place: PropTypes.string,
      availableFrom: PropTypes.string,
      language: PropTypes.string,
      informational_plates: PropTypes.string,
      phone: PropTypes.arrayOf(PropTypes.string),
      additional_information: PropTypes.string
    })
  ),
  showPopup: PropTypes.func,
  makeItemActive: PropTypes.func.isRequired,

  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired,
  history: PropTypes.shape().isRequired
};

export default connect(
  state => ({
    defibrillators: state.defs.mapData,
    defibrillatorsActiveId: state.defs.active,
    mapState: state.mapState
  }),
  dispatch => ({
    showPopup: popupInfo => dispatch(showPopup(popupInfo)),
    makeItemActive: itemId => dispatch(setActive(itemId))
  })
)(withRouter(DefibrillatorPinLayer));
