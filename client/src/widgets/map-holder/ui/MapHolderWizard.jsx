import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import MapHolder from './MapHolder';
import MapHolderMobile from './MapHolderMobile';

const MapHolderWizard = props => (
  <Wizard
    {...props}
    desktopVersion={MapHolder}
    mobileVersion={MapHolderMobile}
  />
);

export default MapHolderWizard;
