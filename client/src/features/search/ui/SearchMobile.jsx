import React from 'react';
import { Formik } from 'formik';
import { Paper } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';

import { INITIAL_VALUES } from 'features/search/lib/constants';
import { useSearchMobileStyles } from 'features/search/model/use-styles';

import { MyInputBase } from 'shared/ui/Fields';

import { useSearchDevices } from '../model/use-search-devices';

export default function SearchMobile() {
  const classes = useSearchMobileStyles();
  const { address, onSearch } = useSearchDevices();

  return (
    <div className={classes.searchWrapper}>
      <Paper>
        <Formik initialValues={INITIAL_VALUES}>
          <DebounceInput
            autoFocus
            id="search"
            name="search"
            value={address}
            debounceTimeout={300}
            element={MyInputBase}
            placeholder="Введіть адресу"
            className={classes.searchInput}
            onChange={onSearch}
          />
        </Formik>
      </Paper>
    </div>
  );
}
