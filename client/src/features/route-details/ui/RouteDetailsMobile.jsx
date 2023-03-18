import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'shared/icons/clock.svg';
import { createRouteDetailsMobileStyles } from '../model/use-styles';
import { useDistanceAndDuration } from '../model/use-distance-and-duration';

const detailsStyle = createRouteDetailsMobileStyles();

function RouteDetails({ details }) {
  const { finalDistance, approximateTime } = useDistanceAndDuration(details);

  return (
    <>
      <div style={detailsStyle.container}>
        <img
          src={Logo}
          alt="сlock"
          style={detailsStyle.logo}
        />
        <p>
          {approximateTime}хв
          <span>({finalDistance}км)</span>
        </p>
      </div>
    </>
  );
}

RouteDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
};

export default RouteDetails;
