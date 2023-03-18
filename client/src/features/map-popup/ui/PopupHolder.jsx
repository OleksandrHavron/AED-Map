import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popup } from 'react-mapbox-gl';

import { popupOffsets } from '../lib/style-constants';
import { usePopupHolderStyles } from '../model/use-styles';

import DefibrillatorPopupContent from './DefibrillatorPopupContent';

const PopupHolder = ({ popupData }) => {
  const classes = usePopupHolderStyles();

  return (
    <>
      {popupData && (
        <Popup
          className={classes.popupHolderContent}
          coordinates={popupData.coordinates}
          offset={popupOffsets}
        >
          <DefibrillatorPopupContent
            id={popupData.data.id}
          />
        </Popup>
      )}
    </>
  );
};

PopupHolder.defaultProps = {
  popupData: null
};

PopupHolder.propTypes = {
  popupData: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string
    }),
    coordinates: PropTypes.arrayOf(PropTypes.number)
  })
};

export default connect(state => ({
  popupData: state.popupData
}))(PopupHolder);
