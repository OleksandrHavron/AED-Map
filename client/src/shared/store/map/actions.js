import {
  SET_MAP_ZOOM,
  SET_MAP_CENTER,
  SET_TRANSPORT_TYPE,
  SET_NEAREST_DEF_INDEX,
  SET_ROUTE_END_POSITION,
  INCREMENT_NEAREST_DEF_INDEX,
  IS_SEARCH_NEXT_NEAREST_DEF_BUTTON
} from './constants';

import { setActive } from 'shared/store/defs/actions';

export const setMapCenter = mapState => {
  return {
    type: SET_MAP_CENTER,
    payload: mapState
  };
};

export const setMapZoom = zoom => {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  };
};

// Sets end route coordinated and set the item with id as active
export const setRoutePosition = (routeCoords, id) => {
  return dispatch => {
    dispatch(
      (() => {
        return {
          type: SET_ROUTE_END_POSITION,
          payload: routeCoords
        };
      })()
    );
    if (!!id) {
      dispatch(setActive(id));
    }
  };
};

export const changeTransportType = type => {
  return {
    type: SET_TRANSPORT_TYPE,
    payload: type
  };
};

export const setDefIndex = value => {
  return {
    type: SET_NEAREST_DEF_INDEX,
    payload: value
  };
};

export const incrementDefIndex = value => {
  return {
    type: INCREMENT_NEAREST_DEF_INDEX,
    payload: value
  };
};

export const setNextNearestDefButtonStatus = value => {
  return {
    type: IS_SEARCH_NEXT_NEAREST_DEF_BUTTON,
    payload: value
  };
};
