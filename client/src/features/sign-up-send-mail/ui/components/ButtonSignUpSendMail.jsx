import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useButtonSignUpSendMailStyles } from 'features/sign-up-send-mail/model/use-styles';

const ButtonSignUpSendmail = ({ handleOpen }) => {
  const classes = useButtonSignUpSendMailStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={handleOpen}
    >
      Зареєструвати користувача
    </Button>
  );
};
ButtonSignUpSendmail.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonSignUpSendmail;
