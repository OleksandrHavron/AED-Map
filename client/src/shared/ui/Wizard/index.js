import React, { useEffect, useState } from 'react';
import { isEqual, throttle } from 'lodash';

import media from 'shared/consts/media';

const Wizard = ({
  mobileVersion: MobileVersionCmp,
  desktopVersion: DesktopVersionCmp,
  ...restProps
}) => {
  const [screenWidth, setScreenWidth] = useState();

  const handleScreenResize = throttle(
    e => setScreenWidth(e.target.innerWidth),
    500
  );

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener(
      'resize',
      handleScreenResize,
      true
    );

    return () =>
      window.removeEventListener(
        'resize',
        handleScreenResize,
        true
      );
  }, [handleScreenResize]);

  const isMobileView =
    !isEqual(window.orientation, 90) &&
    screenWidth < media.ipad;
  const Cmp = isMobileView
    ? MobileVersionCmp
    : DesktopVersionCmp;

  return <Cmp {...restProps} />;
};

export { Wizard };
