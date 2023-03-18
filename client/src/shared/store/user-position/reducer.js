import {
  SET_USER_POSITION,
  INPUT_USER_POSITION,
  INPUT_USER_POSITION_PLACEHOLDER,
  START_WATCHING_POSITION,
  STOP_WATCHING_POSITION,
  SET_GEOLOCATION_STATUS
} from './constants';

const initialState = {
  coords: {
    lng: null,
    lat: null
  },
  userLocation: '',
  userLocationPlaceHolder: '',
  watchId: null,
  geolocationProvided: false
};

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_USER_POSITION:
      const { lng, lat } = payload;
      return { ...state, coords: { lng, lat } };

    case START_WATCHING_POSITION:
      if (state.watchId === null) {
        return { ...state, watchId: payload };
      } else {
        return state;
      }

    case STOP_WATCHING_POSITION:
      if (state.watchId !== null) {
        navigator.geolocation.clearWatch(state.watchId);
      }
      return { ...state, watchId: null };

    case SET_GEOLOCATION_STATUS:
      return { ...state, geolocationProvided: payload };

    case INPUT_USER_POSITION:
      return { ...state, userLocation: payload };

    case INPUT_USER_POSITION_PLACEHOLDER:
      return { ...state, userLocationPlaceHolder: payload };

    default:
      return state;
  }
};
