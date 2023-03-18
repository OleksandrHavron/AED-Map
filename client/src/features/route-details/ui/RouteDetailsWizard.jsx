import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import RouteDetails from './RouteDetails';
import RouteDetailsMobile from './RouteDetailsMobile';

const RouteDetailsWizard = props => (
  <Wizard
    {...props}
    desktopVersion={RouteDetails}
    mobileVersion={RouteDetailsMobile}
  />
);

export default RouteDetailsWizard;
