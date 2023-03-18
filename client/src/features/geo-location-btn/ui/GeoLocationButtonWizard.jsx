import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import GeoLocationButton from './GeoLocationButton';
import GeoLocationButtonMobile from './GeoLocationButtonMobile';

const GeoLocationButtonWizard = props => (
  <Wizard
    {...props}
    desktopVersion={GeoLocationButton}
    mobileVersion={GeoLocationButtonMobile}
  />
);

export default GeoLocationButtonWizard;
