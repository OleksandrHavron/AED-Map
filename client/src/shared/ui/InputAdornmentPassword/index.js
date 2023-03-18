import React from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

const InputAdornmentPassword = ({
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword
}) => (
  <InputAdornment position="end">
    <Tooltip title={!showPassword
      ? 'Показати пароль'
      : 'Сховати пароль'}>
      <IconButton
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Tooltip>
  </InputAdornment>
);

InputAdornmentPassword.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  handleClickShowPassword: PropTypes.func.isRequired,
  handleMouseDownPassword: PropTypes.func.isRequired
};

export default InputAdornmentPassword;
