import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMapboxGl from 'react-mapbox-gl';
import React, { useState, useEffect } from 'react';

import { getDirections } from 'shared/api/map';

import useAlert from 'shared/ui/Alert/use-alert';
import { MAPBOX_TOKEN } from 'shared/consts/keys';
import { hidePopup } from 'shared/store/popup/actions';
import { addNewPoint } from 'shared/store/point/actions';
import {
  setMapZoom,
  setMapCenter
} from 'shared/store/map/actions';
import {
  fetchDefs,
  setActive
} from 'shared/store/defs/actions';
import {
  setGeolocation,
  startWatchingPosition
} from 'shared/store/user-position/actions';

import {
  UserPin,
  AddedPin,
  PointLayer,
  RouteLayer,
  DefibrillatorPinLayer
} from 'features/map-layers';
import { ResetButton } from 'features/search';
import { PopupHolder } from 'features/map-popup';
import { RouteDetails } from 'features/route-details';
import { GeoLocationButton } from 'features/geo-location-btn';
import { SearchNearestDefButton } from 'features/search-nearest-def';

import { useMapHolderMobileStyles } from '../model/use-styles';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

const MapHolderMobile = ({
  fetchDefItems,
  mapState,
  userPosition,
  endRouteCoords,
  transportType,
  newPoint,
  setMapCenter,
  // startWatchingPosition,
  setGeolocation,
  addNewPoint,
  hidePopup,
  setActiveId,
  visible
}) => {
  const classes = useMapHolderMobileStyles({ visible });
  const [, showAlert] = useAlert();
  const [map, setLocalMap] = useState(null);
  const { lng, lat, zoom } = mapState;

  const handlePopupClose = event => {
    if (event.target.tagName === 'CANVAS') {
      hidePopup();
    }
  };
  useEffect(() => {
    fetchDefItems();
    document.addEventListener('click', handlePopupClose);
    return () => {
      document.removeEventListener(
        'click',
        handlePopupClose
      );
    };
    // eslint-disable-next-line
  }, []);

  const loadMap = async mapRaw => {
    if (mapRaw) {
      setLocalMap(mapRaw);
    }
  };

  const changeMapCenterCoords = event => {
    setMapCenter({
      ...event.getCenter(),
      zoom: event.getZoom()
    });
  };

  const onZoomEnded = event => {
    setMapCenter({
      ...mapState,
      zoom: event.getZoom()
    });
  };

  const onZoomStarted = () => {
    hidePopup();
  };

  const getCurrentLocation = _ => {
    setGeolocation(coords => {
      if (coords == null) {
        showAlert({
          open: true,
          severity: 'error',
          message: 'Позиція користувача не знайдена'
        });
        return;
      }
      const { longitude, latitude } = coords;
      setMapCenter({
        lng: longitude,
        lat: latitude
      });
    });
  };
  useEffect(() => {
    if (Object.keys(newPoint).length !== 0) {
      const { lng, lat } = newPoint;
      setMapCenter({ lng, lat });
    }
    // eslint-disable-next-line
  }, [newPoint]);

  // Sets map center to current Position of the user
  useEffect(() => {
    setGeolocation(coords => {
      if (coords == null) {
        return;
      }
      const { longitude, latitude } = coords;
      setMapCenter({ lng: longitude, lat: latitude });
      //TODO: this method must be deleted, because it causes to error in console and causes to return icons to the previous state.
      // startWatchingPosition();
    });
  }, [setGeolocation, setMapCenter]);

  const onDblClickMap = (_, event) => {
    const currentRoute = window.location.pathname;
    if (
      currentRoute === '/add-form' ||
      currentRoute.includes('/edit-form')
    ) {
      const { lng, lat } = event.lngLat;
      addNewPoint({ lng, lat });
      event.preventDefault();
    }
  };

  const [routeCoords, setRouteCords] = useState([]);
  const [routeDetails, setRouteDetails] = useState({
    distance: null,
    duration: null
  });

  const [showRouteDetails, setShowRouteDetails] = useState(
    false
  );

  const getRoute = async (start, endPosition, types) => {
    const query = await getDirections(
      types,
      start,
      endPosition
    );
    const data = query.routes[0];
    setRouteCords(data.geometry.coordinates);
    setShowRouteDetails(true);
    setRouteDetails({
      distance: data.distance,
      duration: data.duration
    });
  };

  const closeRoute = () => {
    setRouteCords([]);
    setShowRouteDetails(false);
    getCurrentLocation();
    setActiveId(null);
  };

  // To build the route, set ending point coordinates to the redux state
  // you can use setRoutePosition from mapState.js or custom
  useEffect(() => {
    const getRouteToPosition = async (
      types = transportType
    ) => {
      if (!!endRouteCoords.lng) {
        setMapCenter({
          lng: endRouteCoords.lng,
          lat: endRouteCoords.lat
        });
        setMapZoom(13.5);
        await getRoute(
          userPosition.coords,
          {
            lng: endRouteCoords.lng,
            lat: endRouteCoords.lat
          },
          types
        );
      }
    };
    getRouteToPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endRouteCoords, transportType]);

  return (
    <div className={classes.mapContainer}>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonItem}>
          <GeoLocationButton
            currentLocation={getCurrentLocation}
          />
        </div>
        <div className={classes.buttonItem}>
          <SearchNearestDefButton />
        </div>
        <div
          className={classes.buttonItem}
          onClick={closeRoute}
        >
          <ResetButton closeRoute={closeRoute} />
        </div>
      </div>

      {showRouteDetails && (
        <RouteDetails
          onClose={closeRoute}
          details={routeDetails}
        />
      )}

      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/oskovbasiuk/ck5nwya36638v1ilpmwxlfv5g"
        className={classes.map}
        center={[lng, lat]}
        zoom={[zoom]}
        onStyleLoad={loadMap}
        onZoomEnd={onZoomEnded}
        onZoomStart={onZoomStarted}
        onRotateEnd={changeMapCenterCoords}
        onDragEnd={changeMapCenterCoords}
        onDblClick={onDblClickMap}
      >
        {map && <DefibrillatorPinLayer map={map} />}
        {userPosition.geolocationProvided && (
          <UserPin
            classes={classes}
            coordinates={userPosition.coords}
          />
        )}

        {Object.keys(newPoint).length !== 0 && (
          <AddedPin coordinates={newPoint} />
        )}

        <PopupHolder />

        {routeCoords.length > 0 && (
          <>
            <RouteLayer coordinates={routeCoords} />
            <PointLayer coordinates={routeCoords} />
          </>
        )}
      </Map>
    </div>
  );
};

MapHolderMobile.defaultProps = {
  mapState: {},
  setVisible: {},
  visible: null,
  setMapCenter: () => {},
  setGeolocation: () => {},
  startWatchingPosition: () => {},
  hidePopup: () => {}
};

MapHolderMobile.propTypes = {
  mapState: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number,
    routeDetails: {
      endCoordinates: {
        lng: PropTypes.string,
        lat: PropTypes.string
      },
      transportType: PropTypes.string
    }
  }),
  newPoint: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }).isRequired,
  addNewPoint: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func,
  setMapZoom: PropTypes.func,
  startWatchingPosition: PropTypes.func,
  hidePopup: PropTypes.func,
  setVisible: PropTypes.func,
  visible: PropTypes.bool,
  fetchDefItems: PropTypes.func
};

export default connect(
  state => ({
    defsState: state.defs,
    mapState: state.mapState,
    newPoint: state.newPoint,
    userPosition: state.userPosition,
    transportType:
      state.mapState.routeDetails.transportType,
    endRouteCoords:
      state.mapState.routeDetails.endCoordinates
  }),
  dispatch => ({
    fetchDefItems: params => dispatch(fetchDefs(params)),
    setGeolocation: f => dispatch(setGeolocation(f)),
    startWatchingPosition: () =>
      dispatch(startWatchingPosition()),
    setMapCenter: map => dispatch(setMapCenter(map)),
    setMapZoom: zoom => dispatch(setMapZoom(zoom)),
    addNewPoint: newPoint =>
      dispatch(addNewPoint(newPoint)),
    hidePopup: () => dispatch(hidePopup()),
    setActiveId: id => dispatch(setActive(id))
  })
)(MapHolderMobile);
