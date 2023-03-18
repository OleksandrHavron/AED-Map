import { withRouter } from 'react-router-dom';
import { compose } from 'shared/utils';

import withData from './with-data';
import withStore from './with-store';
import withBrowserRouter from './with-router';
import withStartModal from './with-start-modal';
import withQueryClient from './with-query-client';
import withConfiguredAuth from './with-configured-auth';

export const withHocs = compose(
  withStore,
  withQueryClient,
  withBrowserRouter,
  withRouter,
  withData,
  withStartModal,
  withConfiguredAuth
);
