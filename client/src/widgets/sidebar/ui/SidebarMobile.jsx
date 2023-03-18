import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';

import { LOGO_IMG } from 'shared/consts/header';
import useAlert from 'shared/ui/Alert/use-alert';

import Alert from 'shared/ui/Alert';
import { Search } from 'features/search';
import { DefsList } from 'features/defs-list';

import { useSidebarMobileStyles } from '../model/use-styles';

const SidebarMobile = search => {
  const isSearchNotEmpty = search.search.address;
  const classes = useSidebarMobileStyles();
  const [alert, ShowAlert] = useAlert();

  return (
    <Router>
      <>
        <div className={classes.sidebarStyle}>
          <img
            src={LOGO_IMG}
            className={classes.sidebarHeader}
            alt="logo"
          />
          <Route path="/" exact>
            <Search />
            {isSearchNotEmpty && <DefsList />}
          </Route>
          <Alert
            open={alert.open}
            message={alert.message}
            severity={alert.severity}
            handleClose={() => ShowAlert({ open: false })}
          />
        </div>
      </>
    </Router>
  );
};

export default connect(state => ({ search: state.search }))(
  SidebarMobile
);
