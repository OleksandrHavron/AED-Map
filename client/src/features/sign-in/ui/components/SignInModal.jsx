import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Container } from '@material-ui/core';

import { cancelToken } from 'shared/utils';
import AuthSchema from 'features/sign-in/model/validator';
import { useSignIn } from 'features/sign-in/model/use-sign-in';
import { INITIAL_VALUES } from 'features/sign-in/lib/constants';
import { useSignInModalStyles } from 'features/sign-in/model/use-styles';

import Form from './Form';
import Header from './Header';
import Footer from './Footer';

const SignInCancelToken = cancelToken();

const SignInModal = () => {
  const signInMutation = useSignIn();
  const classes = useSignInModalStyles();

  const [error, setError] = useState('');

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    signInMutation.mutate(values, {
      onError: e =>
        setError(e?.message || e?.response?.message)
    });

    setSubmitting(false);
  };

  useEffect(() => {
    return () => {
      SignInCancelToken.cancel();
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Header />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={AuthSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form isSubmitting={isSubmitting} />
          )}
        </Formik>

        <Footer error={error} />
      </div>
    </Container>
  );
};

export default SignInModal;
