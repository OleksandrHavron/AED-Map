import React from 'react';
import PropTypes from 'prop-types';

import { useMapInfoMessageMobileStyles } from '../model/use-styles';

import LoaderMobile from 'shared/ui/Loader/LoaderMobile';

const InfoMessageMobile = ({ children }) => {
  const classes = useMapInfoMessageMobileStyles();
  const isLoading = children === 'Завантаження...';

  return (
    <div className={classes.infoMessage}>
      {isLoading && <LoaderMobile />}
      <p>{children}</p>
    </div>
  );
};

InfoMessageMobile.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoMessageMobile;
