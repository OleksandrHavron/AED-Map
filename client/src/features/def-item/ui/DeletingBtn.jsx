import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { useDeletingButtonStyles } from '../model/use-styles';

const DeletingBtn = ({ handleOpen }) => {
  const classes = useDeletingButtonStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.pointCardDeleteButton}
      size="small"
      onClick={handleOpen}
    >
      Видалити
    </Button>
  );
};

DeletingBtn.defaultProps = {
  handleOpen: () => null
};
DeletingBtn.propTypes = {
  handleOpen: PropTypes.func
};

export default DeletingBtn;
