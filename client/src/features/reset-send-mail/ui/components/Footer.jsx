import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useFooterStyles } from 'features/reset-send-mail/model/use-styles';

const Footer = ({ success }) => {
  const classes = useFooterStyles();

  return (
    <Typography
      className={classes.message}
      variant="body2"
      color="primary"
      align="center"
    >
      {success}
    </Typography>
  );
};

Footer.defaultProps = {
  success: ''
};

Footer.propTypes = {
  success: PropTypes.string
};

export default Footer;
