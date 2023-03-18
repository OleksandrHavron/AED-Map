import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IconButton, TextField } from '@material-ui/core';

import ClearIcon from 'shared/icons/icons8-clear.svg';

import { setMapCenter } from 'shared/store/map/actions';
import { useDefibrillatorAlert } from 'widgets/map-holder/model/use-defibrilator-alert';
import {
  getGeocodingOptions,
  getGeocodingDetails
} from 'shared/api/gmap';
import {
  setUserPosition,
  inputUserPosition,
  setGeolocationStatus
} from 'shared/store/user-position/actions';

import { SearchNearestDefButton } from 'features/search-nearest-def';

import { useSearchUserPositionStyles } from '../model/use-styles';

export default function SearchUserPosition({
  currentLocation,
  closeRouteDetails
}) {
  const classes = useSearchUserPositionStyles();

  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  const userLocationValue = useSelector(
    state => state.userPosition.userLocation
  );
  const userLocationPlaceHolderValue = useSelector(
    state => state.userPosition.userLocationPlaceHolder
  );

  const {
    showChangePositionAlert
  } = useDefibrillatorAlert();

  const onChange = async ({ target: { value } }) => {
    dispatch(inputUserPosition(value));
    if (value.trim()) {
      const countries = await getGeocodingOptions(value);
      setOptions(countries.predictions);
    }
  };

  const onSelectOption = async (_, selectedOption) => {
    if (selectedOption != null) {
      const response = await getGeocodingDetails(
        selectedOption.place_id
      );
      const coordinates = response.result.geometry.location;

      dispatch(
        inputUserPosition(selectedOption.description)
      );
      if (isEmpty(coordinates)) {
        showChangePositionAlert();
        return;
      }

      closeRouteDetails();

      dispatch(setGeolocationStatus(true));
      dispatch(setUserPosition(coordinates));
      dispatch(setMapCenter(coordinates));
    }
  };

  return (
    <div className={classes.contentSearchBox}>
      <Autocomplete
        id="search_positon"
        filterOptions={x => x}
        className={classes.Autocomplete}
        classes={{
          root: classes.root,
          inputRoot: classes.root,
          clearIndicator: classes.clearIndicator,
          clearIndicatorDirty: classes.clearIndicator
        }}
        options={options}
        getOptionLabel={option => option.description}
        getOptionSelected={(option, value) =>
          option?.id === value?.id
        }
        onChange={onSelectOption}
        inputValue={userLocationValue}
        renderInput={params => (
          <div className={classes.content}>
            <TextField
              {...params}
              onChange={onChange}
              value={userLocationValue}
              className={classes.inputStyle}
              placeholder={
                userLocationPlaceHolderValue
                  ? userLocationPlaceHolderValue
                  : 'Введіть ваше місцезнаходження'
              }
            />

            {userLocationValue.trim() && (
              <IconButton
                className={classes.contentClearIcon}
                onClick={currentLocation}
              >
                <img
                  width={15}
                  height={15}
                  src={ClearIcon}
                  alt="Clear Icon"
                />
              </IconButton>
            )}
          </div>
        )}
      />

      <SearchNearestDefButton />
    </div>
  );
}
