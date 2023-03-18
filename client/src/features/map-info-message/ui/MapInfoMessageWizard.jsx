import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import MapInfoMessage from './MapInfoMessage';
import MapInfoMessageMobile from './MapInfoMessageMobile';

const MapInfoMessageWizard = props => (
  <Wizard
    {...props}
    desktopVersion={MapInfoMessage}
    mobileVersion={MapInfoMessageMobile}
  />
);

export default MapInfoMessageWizard;
