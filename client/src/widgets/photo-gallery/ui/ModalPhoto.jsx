import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from 'shared/ui/ModalWrapper';
import ModalPhotoBtn from './ModalPhotoBtn';
import ModalPhotoContent from './ModalPhotoContent';

const ModalPhoto = ({ images }) => {
  return (
    <ModalWrapper
      ButtonOpen={ModalPhotoBtn}
      ModalContent={({ handleClose }) => (
        <ModalPhotoContent
          images={images}
          handleClose={handleClose}
        />
      )}
    />
  );
};

ModalPhoto.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      filename: PropTypes.string
    })
  ).isRequired
};

export default ModalPhoto;
