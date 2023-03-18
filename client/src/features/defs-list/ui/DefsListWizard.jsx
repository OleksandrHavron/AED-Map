import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import DefsList from './DefsList';
import DefsListMobile from './DefsListMobile';

const DefsListWizard = props => (
  <Wizard
    {...props}
    desktopVersion={DefsList}
    mobileVersion={DefsListMobile}
  />
);

export default DefsListWizard;
