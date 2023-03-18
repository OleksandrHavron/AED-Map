import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

import { useBlockingButtonStyles } from '../model/use-styles';

const BlockingBtn = ({ handleOpen, blocked }) => {
  const classes = useBlockingButtonStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      className={
        blocked
          ? classes.pointCardBlockButtonBlocked
          : classes.pointCardBlockButton
      }
      size="small"
      onClick={handleOpen}
    >
      <BlockIcon fontSize="small" />
    </Button>
  );
};

BlockingBtn.defaultProps = {
  handleOpen: () => null
};
BlockingBtn.propTypes = {
  handleOpen: PropTypes.func,
  blocked: PropTypes.bool.isRequired
};

export default BlockingBtn;
