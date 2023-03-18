import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useFilterFormHeaderStyles } from 'features/filter/model/use-styles';

const FilterFormHeader = () => {
  const classes = useFilterFormHeaderStyles();

  return (
    <div>
      <Avatar className={classes.avatar}>
        <FilterListIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Фільтр
      </Typography>
    </div>
  );
};

export default FilterFormHeader;
