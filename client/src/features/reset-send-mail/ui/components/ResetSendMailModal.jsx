import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Container } from '@material-ui/core';

import { cancelToken } from 'shared/utils';
import { resetSendmail } from 'shared/api/auth';

import { INITIAL_VALUES } from 'features/reset-send-mail/lib/constants';
import ResetSendmailSchema from 'features/reset-send-mail/model/validator';
import { useResetSendMailModalStyles } from 'features/reset-send-mail/model/use-styles';

import Form from './Form';
import Header from './Header';
import Footer from './Footer';

const ResetSendmailCancelToken = cancelToken();

const ResetSendMailModal = () => {
  const classes = useResetSendMailModalStyles();
  const [success, setSuccess] = useState('');

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    try {
      const res = await resetSendmail(values);
      const { message } = res;
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
      ResetSendmailCancelToken.cancel();
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
          validationSchema={ResetSendmailSchema}
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

export default ResetSendMailModal;
