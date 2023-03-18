import React from 'react';
import { Formik } from 'formik';
import { Paper } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';

import { INITIAL_VALUES } from 'features/search/lib/constants';
import { useSearchStyles } from 'features/search/model/use-styles';

import { Filter } from 'features/filter';
import { MyInputBase } from 'shared/ui/Fields';

import { useSearchDevices } from '../model/use-search-devices';

export default function Search() {
  const classes = useSearchStyles();
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
            element={MyInputBase}
            debounceTimeout={300}
            startAdornment={<Filter />}
            className={classes.searchInput}
            placeholder="Впишіть сюди адресу"
            onChange={onSearch}
          />
        </Formik>
      </Paper>
    </div>
  );
}
