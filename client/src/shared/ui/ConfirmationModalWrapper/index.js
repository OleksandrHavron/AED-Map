import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import ModalWrapper from '../ModalWrapper';

const ConfirmationModalWrapper = ({
  ButtonOpen,
  confirmHandle,
  rejectHandle,
  message,
  messageAlert
}) => {
  return (
    <>
      <ModalWrapper
        ButtonOpen={ButtonOpen}
        ModalContent={e => (
          <Content
            handleClose={e.handleClose}
            confirmHandle={confirmHandle}
            rejectHandle={rejectHandle}
            message={message}
            messageAlert={messageAlert}
          />
        )}
      />
    </>
  );
};

ConfirmationModalWrapper.defaultProps = {
  confirmHandle: () => null,
  rejectHandle: () => null
};

ConfirmationModalWrapper.propTypes = {
  ButtonOpen: PropTypes.func.isRequired,
  confirmHandle: PropTypes.func,
  rejectHandle: PropTypes.func,
  message: PropTypes.string.isRequired,
  messageAlert: PropTypes.string.isRequired
};

export default ConfirmationModalWrapper;
