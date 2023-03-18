import React from 'react';
import ModalWrapper from 'shared/ui/ModalWrapper';

import ResetSendMailModal from './components/ResetSendMailModal';
import ButtonResetSendMail from './components/ButtonResetSendMail';

const ResetSendMail = () => (
  <ModalWrapper
    ButtonOpen={ButtonResetSendMail}
    ModalContent={ResetSendMailModal}
  />
);

export default ResetSendMail;
