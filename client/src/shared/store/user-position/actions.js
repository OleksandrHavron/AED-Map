import { get, first } from 'lodash'
import { getReverseGeocoding } from 'shared/api/gmap';
import {
  SET_USER_POSITION,
  INPUT_USER_POSITION,
  INPUT_USER_POSITION_PLACEHOLDER,
  SET_GEOLOCATION_STATUS,
  START_WATCHING_POSITION,
  STOP_WATCHING_POSITION
} from './constants';

/*
 * Set user position manually.
 */
export const setUserPosition = payload => {
  return {
    type: SET_USER_POSITION,
    payload: payload
  };
};

/*
 * Sets user location based on getCurrentPosition function,
 */
export const setGeolocation = f => {
  return dispatch => {
    const error = () => {
      dispatch({
        type: SET_GEOLOCATION_STATUS,
        payload: false
      });
      f(null);
    };
    const success = async ({ coords }) => {
      const { latitude, longitude } = coords;
      dispatch({
        type: SET_USER_POSITION,
        payload: { lat: latitude, lng: longitude }
      });
      dispatch({
        type: SET_GEOLOCATION_STATUS,
        payload: true
      });
      f({ latitude, longitude });

      // Input to serarch user location placeholder address 
      const data = await getReverseGeocoding({ lng: longitude, lat: latitude })
      const results = get(data, 'results')
      if (results) {
        const first_result = first(results)
        dispatch(inputPlaceholderUserPosition(first_result?.formatted_address))
      }
    };
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      { maximumAge: 60000, enableHighAccuracy: true }
    );
  };
};

/*
 * Start constantly updating user location
 */
export const startWatchingPosition = () => {
  return (dispatch, getState) => {
    if (getState.watchId) {
      return;
    }
    const error = e => {
      dispatch({
        type: SET_GEOLOCATION_STATUS,
        payload: false
      });
    };

    const success = ({ coords }) => {
      const { latitude, longitude } = coords;
      dispatch({
        type: SET_USER_POSITION,
        payload: { lat: latitude, lng: longitude }
      });
      dispatch({
        type: SET_GEOLOCATION_STATUS,
        payload: true
      });
    };
    const id = navigator.geolocation.watchPosition(
      success,
      error,
      { maximumAge: 60000, enableHighAccuracy: true }
    );
    dispatch({
      type: START_WATCHING_POSITION,
      payload: id
    });
  };
};

/*
 * Set boolean value either geolocation working or not.
 */
export const setGeolocationStatus = payload => {
  return {
    type: SET_GEOLOCATION_STATUS,
    payload: payload
  };
};

/*
 * Stops constantly updating user location.
 */
export const stopWatching = () => {
  return {
    type: STOP_WATCHING_POSITION
  };
};

/*
 * User input his positon
 */
export const inputUserPosition = payload => {
  return {
    type: INPUT_USER_POSITION,
    payload: payload
  };
};

/*
 * User input placeholder his positon
 */
export const inputPlaceholderUserPosition = payload => {
  return {
    type: INPUT_USER_POSITION_PLACEHOLDER,
    payload: payload
  };
};

