import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { ResetSendMail } from 'features/reset-send-mail';
import { useFooterStyles } from 'features/sign-in/model/use-styles';

const Footer = ({ error }) => {
  const classes = useFooterStyles();

  return (
    <>
      <Grid container>
        <Grid
          item
          xs
          className={classes.containerResetPassword}
        >
          <ResetSendMail />
        </Grid>
      </Grid>
      <Typography
        className={classes.message}
        variant="body2"
        color="error"
        align="center"
      >
        {error}
      </Typography>
    </>
  );
};

Footer.defaultProps = {
  error: ''
};

Footer.propTypes = {
  error: PropTypes.string
};

export default Footer;
