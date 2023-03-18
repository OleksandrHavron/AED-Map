import React from 'react';
import ModalWrapper from 'shared/ui/ModalWrapper';

import SignUpSendMailModal from './components/SignUpSendMailModal';
import ButtonSignUpSendmail from './components/ButtonSignUpSendMail';

const SignUpSendMail = () => (
  <ModalWrapper
    ButtonOpen={ButtonSignUpSendmail}
    ModalContent={SignUpSendMailModal}
  />
);

export default SignUpSendMail;
