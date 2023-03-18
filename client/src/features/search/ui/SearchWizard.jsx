import React from 'react';

import { Wizard } from 'shared/ui/Wizard';

import Search from './Search';
import SearchMobile from './SearchMobile';

const SearchWizard = props => (
  <Wizard
    {...props}
    desktopVersion={Search}
    mobileVersion={SearchMobile}
  />
);

export default SearchWizard;
