import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ModalPhotoBtn = ({ handleOpen }) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleOpen}
    >
      Фотографії
    </Button>
  );
};

ModalPhotoBtn.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default ModalPhotoBtn;
