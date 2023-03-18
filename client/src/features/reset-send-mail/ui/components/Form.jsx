import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button } from '@material-ui/core';
import { Form as FormFormik } from 'formik';

import { MyTextField } from 'shared/ui/Fields';
import { useFormStyles } from 'features/reset-send-mail/model/use-styles';

const Form = ({ isSubmitting }) => {
  const classes = useFormStyles();

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
      <Tooltip title={'ВІДНОВИТИ ПАРОЛЬ'}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Відновити пароль
        </Button>
      </Tooltip>
    </FormFormik>
  );
};

Form.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
};

export default Form;
