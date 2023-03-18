import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import SearchNearestDefButton from './SearchNearestDefButton';
import SearchNearestDefButtonMobile from './SearchNearestDefButtonMobile';

const SearchNearestDefButtonWizard = props => (
  <Wizard
    {...props}
    desktopVersion={SearchNearestDefButton}
    mobileVersion={SearchNearestDefButtonMobile}
  />
);

export default SearchNearestDefButtonWizard;
