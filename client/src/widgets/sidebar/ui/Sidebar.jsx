import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import useAlert from 'shared/ui/Alert/use-alert';
import checkPermission from 'shared/utils/permission';
import {
  ACCOUNT,
  CREATE_DEF_POINT
} from 'shared/store/defs/constants';

import Alert from 'shared/ui/Alert';
import Header from 'shared/ui/Header';
import { Search } from 'features/search';
import { AddDef } from 'features/add-def';
import { Account } from 'features/account';
import { EditDef } from 'features/edit-def';
import { DefsList } from 'features/defs-list';
import PrivateRoute from 'shared/ui/PrivateRoute';

import { useSidebarStyles } from '../model/use-styles';

const Sidebar = ({ user, visible }) => {
  const classes = useSidebarStyles({ visible });
  const [alert, ShowAlert] = useAlert();
  const [
    permissionForAdd,
    changePermissionForAdd
  ] = useState(false);
  const [
    permissionForAccount,
    changePermissionForAccount
  ] = useState(false);

  useEffect(() => {
    const permissionAdd = checkPermission(
      CREATE_DEF_POINT,
      user
    );
    const permissionAccount = checkPermission(
      ACCOUNT,
      user
    );
    changePermissionForAdd(permissionAdd);
    changePermissionForAccount(permissionAccount);
  }, [user]);

  return (
    <Router>
      <div className={classes.sidebarStyle}>
        <Header />
        <Route path="/" exact>
          <Search />
          <DefsList />
          <Link
            to="/add-form"
            className={classes.linkStyle}
          >
            {permissionForAdd && (
              <Button
                className={classes.addButtonStyle}
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
              >
                Додати новий дефібрилятор
              </Button>
            )}
          </Link>
        </Route>
        <PrivateRoute
          path="/add-form"
          component={AddDef}
          permission={permissionForAdd}
        />
        <Route path="/edit-form" component={EditDef} />
        <PrivateRoute
          path="/account"
          component={Account}
          permission={permissionForAccount}
        />
        <Alert
          open={alert.open}
          message={alert.message}
          severity={alert.severity}
          handleClose={() => ShowAlert({ open: false })}
        />
      </div>
    </Router>
  );
};

Sidebar.defaultProps = {
  user: null
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  visible: PropTypes.bool.isRequired
};

export default connect(state => ({
  user: state.user.user
}))(Sidebar);
