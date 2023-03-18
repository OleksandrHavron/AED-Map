import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink, useHistory } from 'react-router-dom';
import DirectionsIcon from '@material-ui/icons/Directions';

import { fetchSingleDefById } from 'shared/api/defs';
import checkPermissions from 'shared/utils/permission';
import {
  setFullTime,
  setFromTime,
  setUntilTime
} from 'shared/store/full-time/actions';
import {
  setMapZoom,
  setDefIndex,
  setMapCenter,
  setRoutePosition,
  setNextNearestDefButtonStatus
} from 'shared/store/map/actions';
import {
  setActive,
  blockDefItem,
  deleteDefItem
} from 'shared/store/defs/actions';
import {
  EDIT_DEF_POINT,
  BASE_ZOOM_VALUE,
  BLOCK_DEF_POINT,
  DELETE_DEF_POINT,
  ENTER_BUTTON_CODE
} from 'shared/store/defs/constants';

import ConfirmationModalWrapper from 'shared/ui/ConfirmationModalWrapper';

import { useDefItemStyles } from '../model/use-styles';

import BlockingBtn from './BlockingBtn';
import DeletingBtn from './DeletingBtn';

const DefItem = ({
  makeItemActive,
  activeItemId,
  defItemInfo,
  index,
  setMapCenterCoords,
  setMapZoomParam,
  setRoutePosition,
  // eslint-disable-next-line react/prop-types
  style,
  deleteDefibrPoint,
  blockDefibrPoint,
  user,
  setTime,
  setFromTime,
  setUntilTime,
  setDefIndex,
  setNextNearestDefButtonStatus
}) => {
  const isActive = defItemInfo._id === activeItemId;
  const hasPermission =
    user &&
    (user.role === 'Admin' ||
      user._id === defItemInfo.owner);
  const classes = useDefItemStyles({
    isActive,
    hasPermission
  });
  const [lng, lat] = defItemInfo.location.coordinates;
  const [
    permissionForEdit,
    changePermissionForEdit
  ] = useState(false);
  const [
    permissionForDelete,
    changePermissionForDelete
  ] = useState(false);
  const [
    permissionForBlockDef,
    changePermissionForBlockDef
  ] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    makeItemActive(defItemInfo._id);
    setMapCenterCoords({
      lng,
      lat
    });
    setMapZoomParam(BASE_ZOOM_VALUE);
  };

  const handleEditClick = event => {
    event.preventDefault();
    setNextNearestDefButtonStatus(false);
    setDefCheckbox(defItemInfo._id);
    history.push(`/edit-form/${defItemInfo._id}`);
  };

  const setDefCheckbox = async id => {
    const res = await fetchSingleDefById(id);
    const data = res.defibrillator;
    setTime(data.fullTimeAvailable);
    const timeFrom =
      data.availableFrom === undefined ||
      data.availableFrom === null
        ? 0
        : data.availableFrom;
    setFromTime(timeFrom);
    const timeUntil =
      data.availableUntil === undefined ||
      data.availableUntil === null
        ? 23
        : data.availableUntil;
    setUntilTime(timeUntil);
  };

  const handleKeyDown = event => {
    if (event.keyCode === ENTER_BUTTON_CODE) {
      setMapCenterCoords({
        lng,
        lat
      });
    }
  };

  const handleRoute = () => {
    const [lng, lat] = defItemInfo.location.coordinates;
    const { _id: id } = defItemInfo;
    setRoutePosition({ lng, lat }, id);
    setDefIndex(index);
    setNextNearestDefButtonStatus(true);
  };

  useEffect(() => {
    const permissionEdit = checkPermissions(
      EDIT_DEF_POINT,
      user,
      defItemInfo
    );
    const permissionDelete = checkPermissions(
      DELETE_DEF_POINT,
      user,
      defItemInfo
    );
    const permissionBlockDef = checkPermissions(
      BLOCK_DEF_POINT,
      user
    );
    changePermissionForEdit(permissionEdit);
    changePermissionForDelete(permissionDelete);
    changePermissionForBlockDef(permissionBlockDef);
    // eslint-disable-next-line
  }, [user]);

  return (
    <NavLink
      to={`?id=${defItemInfo._id}`}
      className={classes.pointCard}
      style={style}
    >
      <div
        className={classes.pointCardInfo}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <h3 className={classes.titleStyle}>
          {defItemInfo.title}
        </h3>
        <p className={classes.descStyle}>
          {defItemInfo.address}
        </p>
      </div>
      <div className={classes.pointCardButtons}>
        {permissionForEdit && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEditClick}
          >
            Редагувати
          </Button>
        )}
        {permissionForDelete && (
          <ConfirmationModalWrapper
            ButtonOpen={DeletingBtn}
            confirmHandle={() =>
              deleteDefibrPoint(defItemInfo._id)
            }
            message="Видалити дефібрилятор?"
            messageAlert="Дефібрилятор успішно видалено"
          />
        )}
        {permissionForBlockDef && (
          <ConfirmationModalWrapper
            ButtonOpen={({ handleOpen }) => (
              <BlockingBtn
                handleOpen={handleOpen}
                blocked={defItemInfo.blocked}
              />
            )}
            confirmHandle={() =>
              blockDefibrPoint(
                defItemInfo._id,
                !defItemInfo.blocked
              )
            }
            message={
              defItemInfo.blocked
                ? 'Розблокувати дефібрилятор?'
                : 'Заблокувати дефібрилятор?'
            }
            messageAlert={
              defItemInfo.blocked
                ? 'Дефібрилятор розблоковано'
                : 'Дефібрилятор заблоковано'
            }
          />
        )}
      </div>
      <div className={classes.routeIconContainer}>
        <Tooltip
          title="Прокласти шлях"
          onClick={handleRoute}
        >
          <DirectionsIcon className={classes.routeIcon} />
        </Tooltip>
      </div>
    </NavLink>
  );
};

DefItem.defaultProps = {
  defItemInfo: {},
  activeItemId: () => null,
  setMapCenterCoords: () => null,
  setMapZoomParam: () => null,
  deleteDefibrPoint: () => null,
  blockDefibrPoint: () => null,
  user: null
};

DefItem.propTypes = {
  defItemInfo: PropTypes.shape({
    _id: PropTypes.string,
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
    additional_information: PropTypes.string,
    blocked: PropTypes.bool,
    owner: PropTypes.string
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  setMapCenterCoords: PropTypes.func,
  setMapZoomParam: PropTypes.func,
  deleteDefibrPoint: PropTypes.func,
  blockDefibrPoint: PropTypes.func,
  activeItemId: PropTypes.string,
  makeItemActive: PropTypes.func.isRequired,
  setRoutePosition: PropTypes.func
};

export default connect(
  state => ({
    user: state.user.user,
    activeItemId: state.defs.active,
    mapData: state.defs.mapData
  }),
  dispatch => ({
    makeItemActive: itemId => dispatch(setActive(itemId)),
    setMapCenterCoords: mapState =>
      dispatch(setMapCenter(mapState)),
    setMapZoomParam: mapState =>
      dispatch(setMapZoom(mapState)),
    deleteDefibrPoint: id => dispatch(deleteDefItem(id)),
    blockDefibrPoint: (id, blocked) =>
      dispatch(blockDefItem(id, blocked)),
    setTime: value => dispatch(setFullTime(value)),
    setFromTime: time => dispatch(setFromTime(time)),
    setUntilTime: time => dispatch(setUntilTime(time)),
    setRoutePosition: (routeCoords, id) =>
      dispatch(setRoutePosition(routeCoords, id)),
    setDefIndex: value => dispatch(setDefIndex(value)),
    setNextNearestDefButtonStatus: value =>
      dispatch(setNextNearestDefButtonStatus(value))
  })
)(DefItem);
