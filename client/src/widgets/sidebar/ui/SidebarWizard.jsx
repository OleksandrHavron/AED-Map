import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';

const SidebarWizard = props => (
  <Wizard
    {...props}
    desktopVersion={Sidebar}
    mobileVersion={SidebarMobile}
  />
);

export default SidebarWizard;
