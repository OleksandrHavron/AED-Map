import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';

import { useValidateUser } from 'shared/hooks/use-validate-user';

import { Main } from 'pages/main';
import { SignInModal } from 'features/sign-in';
import { ResetPassword } from 'features/reset-password';
import { SignUpPassword } from 'features/sign-up-password';

import { withHocs } from './hocs';

import './App.css';

const useStyles = makeStyles({
  mainStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
  }
});

const App = ({ user, children, setStartModal }) => {
  const classes = useStyles();
  const history = useHistory();
  const validateUserMutation = useValidateUser();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    validateUserMutation.mutate(null, {
      onMutate: () => setDidMount(true),
      onSuccess: () => {
        setStartModal(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (didMount) history.push('/');
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="App">
      <div className={classes.mainStyle}>
        <Switch>
          <Route
            path="/admin"
            exact
            component={SignInModal}
          />
          <Route
            path="/signup/:email/:token"
            component={SignUpPassword}
          />
          <Route
            path="/reset/:email/:token"
            component={ResetPassword}
          />
          <Route path="/" component={Main} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
      {children}
    </div>
  );
};

App.defaultProps = {
  user: null
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default withHocs(App);
