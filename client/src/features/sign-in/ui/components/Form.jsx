import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';
import { MyTextField } from 'shared/ui/Fields';
import { useFormStyles } from 'features/sign-in/model/use-styles';
import InputAdornmentPassword from 'shared/ui/InputAdornmentPassword';

const Form = ({ isSubmitting }) => {
  const classes = useFormStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <FormFormik className={classes.form} noValidate>
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Електронна адреса"
        name="email"
        autoComplete="email"
      />
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="password"
        InputProps={{
          endAdornment: (
            <InputAdornmentPassword
              showPassword={showPassword}
              handleClickShowPassword={
                handleClickShowPassword
              }
              handleMouseDownPassword={
                handleMouseDownPassword
              }
            />
          )
        }}
      />
      <Tooltip title={'ВХІД'}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Вхід
        </Button>
      </Tooltip>
    </FormFormik>
  );
};

Form.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
