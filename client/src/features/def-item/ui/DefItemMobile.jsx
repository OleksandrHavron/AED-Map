import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSearch } from 'shared/store/search/actions';

import { setActive } from 'shared/store/defs/actions';
import {
  setMapZoom,
  setMapCenter
} from 'shared/store/map/actions';
import {
  ENTER_BUTTON_CODE,
  BASE_ZOOM_VALUE
} from 'shared/store/defs/constants';

import { useDefItemMobileStyles } from '../model/use-styles';

const DefItemMobile = ({
  makeItemActive,
  defItemInfo,
  setMapCenterCoords,
  setMapZoomParam,
  setSearch,
  // eslint-disable-next-line react/prop-types
  styleParam
}) => {
  const classes = useDefItemMobileStyles();
  const [lng, lat] = defItemInfo.location.coordinates;

  const handleClick = () => {
    setSearch('');
    makeItemActive(defItemInfo._id);
    setMapCenterCoords({
      lng,
      lat
    });
    setMapZoomParam(BASE_ZOOM_VALUE);
  };

  const handleKeyDown = event => {
    if (event.keyCode === ENTER_BUTTON_CODE) {
      setMapCenterCoords({
        lng,
        lat
      });
    }
  };

  return (
    <NavLink
      to={`?id=${defItemInfo._id}`}
      className={classes.pointCard}
      style={styleParam}
    >
      <div
        className={classes.pointCardInfo}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <h3 className={classes.titleStyle}>
          {defItemInfo.address}
        </h3>
        <p className={classes.descStyle}>
          {defItemInfo.title},{defItemInfo.address}
        </p>
      </div>
    </NavLink>
  );
};

DefItemMobile.defaultProps = {
  defItemInfo: {},
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null
};

DefItemMobile.propTypes = {
  defItemInfo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    })
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func,
  makeItemActive: PropTypes.func.isRequired
};

export default connect(
  state => ({
    mapData: state.defs.mapData
  }),
  dispatch => ({
    makeItemActive: itemId => dispatch(setActive(itemId)),
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState)),
    setSearch: value =>
      dispatch(setSearch({ title: value, adress: value }))
  })
)(DefItemMobile);
