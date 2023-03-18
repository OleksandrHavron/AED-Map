import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useAccountControlStyles } from '../model/use-styles';

import { SIGNUP } from 'shared/store/user/constants';
import checkPermission from 'shared/utils/permission';

import ButtonBack from 'shared/ui/ButtonBack';
import { ButtonSignOut } from 'features/sign-in';
import { SignUpSendMail } from 'features/sign-up-send-mail';

const Account = ({ user }) => {
  const classes = useAccountControlStyles();
  const [
    permissionForSignUp,
    changePermissionForSignUp
  ] = useState(false);

  useEffect(() => {
    const permissionSignUp = checkPermission(SIGNUP, user);
    changePermissionForSignUp(permissionSignUp);
  }, [user]);

  return (
    <div className={classes.container}>
      {permissionForSignUp && <SignUpSendMail />}
      <ButtonSignOut />
      <ButtonBack />
    </div>
  );
};

Account.defaultProps = {
  user: null
};

Account.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export default connect(state => ({
  user: state.user.user
}))(Account);
