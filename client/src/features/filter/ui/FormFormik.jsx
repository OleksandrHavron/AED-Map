import React from 'react';
import { Form } from 'formik';
import PropTypes from 'prop-types';

import { MyTextField, MySelect } from 'shared/ui/Fields';
import { useFormStyles } from 'features/filter/model/use-styles';

import {
  availableFrom,
  languageInterface,
  informationalPlates
} from '../lib/constants';

import FormButtons from './FormButtons';

const FormFormik = ({ onSubmit }) => {
  const classes = useFormStyles();

  return (
    <Form
      className={classes.form}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <MyTextField
        label="Назва"
        name="title"
        className={classes.inputs}
      />
      <MySelect
        labelTitle="Мова інтерфейсу"
        label="language"
        name="language"
        options={languageInterface}
        classes={classes.inputs}
      />
      <MySelect
        labelTitle="Інформаційні таблички"
        label="informational_plates"
        name="informational_plates"
        options={informationalPlates}
        classes={classes.inputs}
      />
      <MySelect
        labelTitle="Години роботи"
        label="availableFrom"
        name="availableFrom"
        options={availableFrom}
        classes={classes.inputs}
      />
      <FormButtons />
    </Form>
  );
};

FormFormik.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default FormFormik;
