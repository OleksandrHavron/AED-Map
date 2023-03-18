import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { cancelToken } from 'shared/utils';
import { resetUser } from 'shared/api/auth';
import ResetSchema from 'features/reset-password/model/validator';
import { INITIAL_VALUES } from 'features/reset-password/lib/constants';
import { useResetPasswordStyles } from 'features/reset-password/model/use-styles';

import { Form, Header, Footer } from './components';

const ResetCancelToken = cancelToken();

const ResetPassword = () => {
  const classes = useResetPasswordStyles();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { email, token } = useParams();

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    try {
      const res = await resetUser({
        ...values,
        token
      });
      const { message } = res;
      resetForm();
      setSuccess(message);
    } catch (e) {
      const { message, errors } = e.response.data;
      setError(message);
      setErrors(errors);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    return () => {
      ResetCancelToken.cancel();
    };
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.paperOuter}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paperInner}>
            <Header />

            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={ResetSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  email={email}
                  isSubmitting={isSubmitting}
                />
              )}
            </Formik>

            <Footer success={success} error={error} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ResetPassword;
