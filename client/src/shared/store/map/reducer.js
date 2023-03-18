import {
  SET_MAP_ZOOM,
  SET_MAP_CENTER,
  SET_TRANSPORT_TYPE,
  SET_NEAREST_DEF_INDEX,
  SET_ROUTE_END_POSITION,
  INCREMENT_NEAREST_DEF_INDEX,
  IS_SEARCH_NEXT_NEAREST_DEF_BUTTON
} from './constants';

const initialState = {
  lng: 24.0311,
  lat: 49.842,
  zoom: 12.5,
  defIndex: -1,
  isSearchNextDefButton: false,
  routeDetails: {
    endCoordinates: {
      lng: null,
      lat: null
    },
    transportType: 'cycling'
  }
};
export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_MAP_CENTER: {
      if (
        state.lng === payload.lng &&
        state.lat === payload.lat
      ) {
        return state;
      }
      return { ...state, ...payload }; // here payload is {lng: number, lat: number}
    }
    case SET_MAP_ZOOM: {
      return { ...state, zoom: payload }; // here payload is number
    }
    case SET_ROUTE_END_POSITION: {
      //payload is {lng: number, lat: number}
      return {
        ...state,
        routeDetails: {
          ...state.routeDetails,
          endCoordinates: payload
        }
      };
    }
    case SET_TRANSPORT_TYPE: {
      // here payload is driving or cycling
      return {
        ...state,
        routeDetails: {
          ...state.routeDetails,
          transportType: payload
        }
      };
    }
    case SET_NEAREST_DEF_INDEX: {
      // here payload is number
      return { ...state, defIndex: payload };
    }
    case IS_SEARCH_NEXT_NEAREST_DEF_BUTTON: {
      // here payload is boolean
      return { ...state, isSearchNextDefButton: payload };
    }
    case INCREMENT_NEAREST_DEF_INDEX: {
      // here payload is number
      return { ...state, defIndex: state.defIndex + 1 };
    }
    default:
      return state;
  }
};
