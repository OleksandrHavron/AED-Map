import React from 'react';
import PropTypes from 'prop-types';

import { useMapInfoMessageStyles } from '../model/use-styles';

import Loader from 'shared/ui/Loader';

const InfoMessage = ({ children }) => {
  const classes = useMapInfoMessageStyles();
  const isLoading = children === 'Завантаження...';

  return (
    <div className={classes.infoMessage}>
      {isLoading && <Loader />}
      <p>{children}</p>
    </div>
  );
};

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoMessage;