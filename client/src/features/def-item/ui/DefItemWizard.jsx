import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import DefItem from './DefItem';
import DefItemMobile from './DefItemMobile';

const DefItemWizard = props => (
  <Wizard
    {...props}
    desktopVersion={DefItem}
    mobileVersion={DefItemMobile}
  />
);

export default DefItemWizard;
