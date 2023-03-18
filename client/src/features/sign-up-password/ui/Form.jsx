import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { MyTextField } from 'shared/ui/Fields';
import InputAdornmentPassword from 'shared/ui/InputAdornmentPassword';
import { useFormStyles } from 'features/sign-up-password/model/use-styles';

const Form = ({ email, isSubmitting }) => {
  const history = useHistory();
  const classes = useFormStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const redirectToMainPage = () => {
    history.push('/');
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
        value={email}
        disabled
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
      <MyTextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="passwordConfirm"
        label="Підтвердження пароля"
        type={showPassword ? 'text' : 'password'}
        id="passwordConfirm"
        autoComplete="passwordConfirm"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Реєстрація
      </Button>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={redirectToMainPage}
      >
        Головна сторінка
      </Button>
    </FormFormik>
  );
};

Form.propTypes = {
  email: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
