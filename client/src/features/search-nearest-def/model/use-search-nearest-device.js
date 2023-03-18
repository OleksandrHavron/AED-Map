import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDefIndex,
  setRoutePosition,
  incrementDefIndex,
  setNextNearestDefButtonStatus
} from 'shared/store/map/actions';
import { useDefibrillatorAlert } from 'widgets/map-holder/model/use-defibrilator-alert';

import {
  defaultTransformFn,
  getNearestDefibrillatorsFn
} from '../lib/nearest-def';

const useSearchNearestDevice = () => {
  const dispatch = useDispatch();
  const oState = useSelector(state => state);
  const {
    showDevicesAlert,
    showPositionAlert
  } = useDefibrillatorAlert();

  const nDefIndex = get(oState, ['mapState', 'defIndex']);
  const { coords, geolocationProvided } = get(
    oState,
    'userPosition',
    {}
  );

  const oCommonUrlParams = {
    latitude: coords.lat,
    longitude: coords.lng
  };
  const oCommonProps = {
    geolocationProvided,
    urlParams: oCommonUrlParams,
    showDevicesAlert,
    showPositionAlert,
    onDataSuccess: (...aParams) =>
      dispatch(setRoutePosition(...aParams))
  };

  const getNearestDefibrillators = getNearestDefibrillatorsFn(
    {
      ...oCommonProps,
      urlParams: {
        ...oCommonUrlParams,
        single: true
      },
      onGetDataSuccess: () => {
        dispatch(setDefIndex(0));
        dispatch(setNextNearestDefButtonStatus(true));
      }
    }
  );

  const getNextNearestDefibrillator = getNearestDefibrillatorsFn(
    {
      ...oCommonProps,
      urlParams: { ...oCommonUrlParams },
      onDevicesError: () => dispatch(setDefIndex(0)),
      onPositionError: () => dispatch(setDefIndex(0)),
      onStartGettingValues: () =>
        dispatch(incrementDefIndex()),
      transformFn: oResponse => {
        const aNearestItems = defaultTransformFn(oResponse);

        return aNearestItems[nDefIndex + 1];
      }
    }
  );

  return {
    getNearestDefibrillators,
    getNextNearestDefibrillator
  };
};

export { useSearchNearestDevice };
