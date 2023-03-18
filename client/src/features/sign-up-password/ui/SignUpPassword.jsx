import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { cancelToken } from 'shared/utils';
import { signUpUser } from 'shared/api/auth';
import SignUpSchema from 'features/sign-up-password/model/validator';
import { INITIAL_VALUES } from 'features/sign-up-password/lib/constants';
import { useSignUpPasswordStyles } from 'features/sign-up-password/model/use-styles';

import Form from './Form';
import Header from './Header';
import Footer from './Footer';

const SignUpCancelToken = cancelToken();

const SignUpPassword = () => {
  const classes = useSignUpPasswordStyles();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { email, token } = useParams();

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    try {
      const data = await signUpUser({
        ...values,
        token
      });
      const { message } = data;
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
      SignUpCancelToken.cancel();
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
              validationSchema={SignUpSchema}
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

export default SignUpPassword;
