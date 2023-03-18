import React from 'react';
import StartModal from './StartModal';
import StartModalMobile from './StartModalMobile';
import { Wizard } from 'shared/ui/Wizard';

const StartModalWizard = props => {
  return (
    <Wizard
      {...props}
      desktopVersion={ StartModal }
      mobileVersion={ StartModalMobile }
    />
  )
}

export default StartModalWizard;
