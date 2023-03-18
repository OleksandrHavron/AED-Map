import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Container } from '@material-ui/core';

import { cancelToken } from 'shared/utils';
import { signUpSendmail } from 'shared/api/auth';

import { INITIAL_VALUES } from 'features/sign-up-send-mail/lib/constants';
import SignUpSendMailSchema from 'features/sign-up-send-mail/model/validator';
import { useSignUpSendMailModalStyles } from 'features/sign-up-send-mail/model/use-styles';

import Form from './Form';
import Header from './Header';
import Footer from './Footer';

const SignUpSendmailCancelToken = cancelToken();

const SignUpSendMailModal = () => {
  const classes = useSignUpSendMailModalStyles();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    try {
      const data = await signUpSendmail(values);
      const { message } = data;
      resetForm();
      setSuccess(message);
    } catch (e) {
      const { errors } = e.response.data;
      setErrors(errors);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    return () => {
      SignUpSendmailCancelToken.cancel();
    };
  }, []);

  return (
    <Container
      className={classes.container}
      component="main"
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Header />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={SignUpSendMailSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form isSubmitting={isSubmitting} />
          )}
        </Formik>

        <Footer success={success} />
      </div>
    </Container>
  );
};

export default SignUpSendMailModal;
