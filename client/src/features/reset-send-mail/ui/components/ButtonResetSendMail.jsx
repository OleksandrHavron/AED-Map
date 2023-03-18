import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button } from '@material-ui/core';

const ButtonResetSendMail = ({ handleOpen }) => (
  <Tooltip title={'ВІДНОВИТИ ПАРОЛЬ'}>
    <Button color="primary" onClick={handleOpen}>
      Відновити пароль
    </Button>
  </Tooltip>
);

ButtonResetSendMail.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ButtonResetSendMail;
