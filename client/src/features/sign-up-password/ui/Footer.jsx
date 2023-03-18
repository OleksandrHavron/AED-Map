import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useFooterStyles } from 'features/sign-up-password/model/use-styles';

const Footer = ({ success, error }) => {
  const classes = useFooterStyles();

  return (
    <Typography
      className={classes.message}
      variant="body2"
      color={error ? 'error' : 'primary'}
      align="center"
    >
      {error || success}
    </Typography>
  );
};

Footer.defaultProps = {
  success: '',
  error: ''
};

Footer.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string
};

export default Footer;
